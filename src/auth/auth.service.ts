import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthRepositoryService } from './repository/auth.repository.service';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepositoryService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async create(createUserDto: CreateUserDto) {
    
      const user = await this.authRepository.createUser(createUserDto);

      if (!user) {
        return { error: 'User creation failed' };
      }
      const { password: _, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        token: this.getJwtToken({ id: user.id }),
      };

  }

  async loginUser(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid ');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid ');
    }

    const roleName = await this.authRepository.getRoleNameFromUser(user);


    // TODO: Retornar un JWT
    const { password: _, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      currentRole: roleName,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
