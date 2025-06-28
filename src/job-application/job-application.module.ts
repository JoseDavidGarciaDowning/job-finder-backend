import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
  imports: [NotificationsModule, DrizzleModule],
})
export class JobApplicationModule {}
