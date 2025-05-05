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
import { roles, userRoles, users } from '../../drizzle/schema/schema';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { eq } from 'drizzle-orm';
import { UserRole } from 'src/interfaces/user-role.interface';
import * as bcrypt from 'bcryptjs';
import { ValidRoles } from '../interfaces';

@Injectable()
export class AuthRepositoryService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      //obtener rol
      const role = await this.db.query.roles.findFirst({
        where: (roles, { eq }) => eq(roles.name, 'applicant'),
      });

      if (!role) throw new Error('El rol no existe');

      //crear usuario
      const { password, ...userData } = createUserDto;
      const [user] = await this.db
        .insert(users)
        .values({
          ...userData,
          password: bcrypt.hashSync(password, 10),
        })
        .returning();

      // asignar el rol al usuario
      const user_roles = await this.db
        .insert(userRoles)
        .values({
          userId: user.id,
          roleId: role.id,
        })
        .returning();

      return user;
    } catch (error) {
      this.handleDbError(error);
    }
  }

  private handleDbError = (error: any) => {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
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
    id: number,
  ): Promise<typeof users.$inferSelect | undefined> {
    const user = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });
    return user;
  }

  async findRolesByUserId(id: number): Promise<ValidRoles[]> {
    const rolesResult = await this.db
      .select({ roleName: roles.name })
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .where(eq(userRoles.userId, id));

    return rolesResult.map((role) => role.roleName as ValidRoles);
  }

  async findUserWithRolesById(id: number): Promise<UserRole | undefined> {
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
