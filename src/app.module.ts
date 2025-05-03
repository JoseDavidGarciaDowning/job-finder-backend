import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { ApplicantModule } from './applicant/applicant.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { CategorySkillModule } from './category-skill/category-skill.module';
import { CategoryModule } from './category/category.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [AuthModule, CompanyModule, ApplicantModule, JobApplicationModule, CategorySkillModule, CategoryModule, SkillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
