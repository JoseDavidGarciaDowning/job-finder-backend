import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './repository/company.repository';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService,CompanyRepository]
})
export class CompanyModule {}
