import { Module } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { AppplicantRepositoryService } from './repository/appplicant.repository.service';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DrizzleModule, // <---- importante importar aquí
    PassportModule,
    AuthModule,
  ],
  controllers: [ApplicantController],
  providers: [ApplicantService, AppplicantRepositoryService],
})
export class ApplicantModule {}
