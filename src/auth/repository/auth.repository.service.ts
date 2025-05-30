import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { CreateUserDto } from '../dto/create-user.dto';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Role, roles, userRoles, users } from '../../drizzle/schema/schema';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { eq } from 'drizzle-orm';
import { UserRole } from 'src/interfaces/user-role.interface';
import * as bcrypt from 'bcryptjs';

import { ValidRolesToASimpleUser, ValidRoles } from '../interfaces/valid-roles';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthRepositoryService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async validateAndGetRole(roleName: string): Promise<Role> {
    if (
      !Object.values(ValidRolesToASimpleUser).includes(
        roleName as ValidRolesToASimpleUser,
      )
    ) {
      throw new BadRequestException(
        `El rol ${roleName} no es válido. Los roles válidos son ${META_ROLES}`,
      );
    }

    const role = await this.db.query.roles.findFirst({
      where: (roles, { eq }) => eq(roles.name, roleName),
    });

    if (!role) {
      throw new BadRequestException(`El rol ${roleName} no existe.`);
    }

    return role;
  }

  async getRoleNameFromUser(user: User): Promise<string> {
    if (!user) {
      throw new BadRequestException(`El usuario no existe.`);
    }

    const role = await this.db.query.roles.findFirst({
      where: (roles, { eq }) => eq(roles.id, user.currentRole),
    });

    if (!role) {
      throw new BadRequestException(`El rol del usuario no existe.`);
    }

    return role.name;
  }

  async getValidRolesFromDb(): Promise<Role[]> {
    const validRoleNames = [
      ValidRolesToASimpleUser.company,
      ValidRolesToASimpleUser.applicant,
    ];

    const rolesFromDb = await this.db.query.roles.findMany({
      where: (roles, { inArray }) => inArray(roles.name, validRoleNames),
    });

    return rolesFromDb;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { currentRole: roleName, password, ...userData } = createUserDto;

    try {
     
      const role = await this.validateAndGetRole(roleName);

      // Crear el usuario
      const hashedPassword = bcrypt.hashSync(password, 10);
      const [user] = await this.db
        .insert(users)
        .values({
          ...userData,
          currentRole: role.id,
          password: hashedPassword,
        })
        .returning();

      // Asignar el rol al usuario (si lo necesitas en una tabla intermedia)
      const validRoles = await this.getValidRolesFromDb();
      await this.db
        .insert(userRoles)
        .values(
          validRoles.map((validRole) => ({
        userId: user.id,
        roleId: validRole.id,
          }))
        )
        .returning();

      return { ...user, currentRole: roleName }; // Retornar el usuario con su rol
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El correo electrónico ya está en uso');
      } else {
        this.handleDbError(error);
      }
    }
  }




  private handleDbError = (error: any) => {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
      error.message,
    );
  };

  async findUserByEmail(
    email: string,
  ): Promise<typeof users.$inferSelect | undefined> {
    const user = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
    return user;
  }

  async findUserById(
    id: string,
  ): Promise<typeof users.$inferSelect | undefined> {
    const user = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });
    return user;
  }

  async findRolesByUserId(id: string): Promise<ValidRoles[]> {
    const rolesResult = await this.db
      .select({ roleName: roles.name })
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .where(eq(userRoles.userId, id));

    return rolesResult.map((role) => role.roleName as ValidRoles);
  }

  async findUserWithRolesById(id: string): Promise<UserRole> {
    const result = await this.db
      .select({
        id: users.id,
        email: users.email,
        password: users.password,
        isActive: users.isActive,
      })
      .from(users)
      .where(eq(users.id, id));

    const roles = await this.findRolesByUserId(id);

    const userWithRoles = {
      ...result[0],
      roleNames: roles,
    };

    return userWithRoles;
  }
}
