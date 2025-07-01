import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './repository/company.repository';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CompanyController],
  imports: [

    AuthModule, // Import Auth module for authentication strategies
  ],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
