import { Type } from 'class-transformer';
import { IsString, IsUUID, Length,IsOptional, ValidateNested } from 'class-validator';

class UbicationDto {
  @IsString()
  countryName: string;

  @IsString()
  countryId: string;

  @IsString()
  regionName: string;

  @IsString()
  regionId: string;
}
export class CreateCompanyDto {
  @IsString()
  @Length(1, 255)
  name: string;


  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => UbicationDto)
   ubication: UbicationDto;
}
