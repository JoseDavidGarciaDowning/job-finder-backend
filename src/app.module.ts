import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApplicantModule } from './applicant/applicant.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { CategorySkillModule } from './category-skill/category-skill.module';
import { CategoryModule } from './category/category.module';
import { SkillModule } from './skill/skill.module';
import { DrizzleModule } from './drizzle/drizzle.module';

import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './location/location.module';
import { JobCharacteristicsModule } from './job-characteristics/job-characteristics.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    AuthModule,
    ApplicantModule,
    JobApplicationModule,
    CategorySkillModule,
    CategoryModule,
    SkillModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LocationModule,
    JobCharacteristicsModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
