import { Controller, Post, Body, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('register-token')
  @Auth()
  registerDevice(
    @Body() registerDeviceDto: RegisterDeviceDto,
    @GetUser() user: User,
  ) {
    return this.notificationsService.registerDevice(
      user.id,
      registerDeviceDto.token,
    );
  }

  @Post('send-to-user')
  @Auth() 
  async sendNotificationToUser(@Body() sendNotificationDto: SendNotificationDto) {
    const { userId, title, body, data } = sendNotificationDto;
    return this.notificationsService.sendNotificationToUser(userId, { title, body, data });
  }
}
