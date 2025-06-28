import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class SendNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsOptional()
  @IsObject()
  data?: { [key: string]: string };
} 