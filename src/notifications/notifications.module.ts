import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [ConfigModule, DrizzleModule, AuthModule],
  exports: [NotificationsService],
})
export class NotificationsModule {}
