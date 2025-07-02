import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
  imports: [NotificationsModule, DrizzleModule, AuthModule],
 
})
export class JobApplicationModule {}
