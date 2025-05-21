import { IsString, IsUUID, Length,IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsUUID()
  userId: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUUID()
  locationId?: string | null;
}
