import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepositoryService } from '../repository/auth.repository.service';
import { users } from 'src/drizzle/schema/schema';
import { UserRole } from 'src/interfaces/user-role.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authRepositoryService: AuthRepositoryService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET') as string,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserRole> {
    ///we got the user
    const { id } = payload;
    const userWithRole = await this.authRepositoryService.findUserWithRolesById(id);
    if (!userWithRole) throw new UnauthorizedException('Token not valid');
    if (!userWithRole.isActive)
      throw new UnauthorizedException('User is not active, talk with admin');

   
    return userWithRole;
  }
}
