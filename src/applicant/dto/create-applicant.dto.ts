import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UbicacionDto {
  @IsString()
  countryName: string;

  @IsString()
  countryId: string;

  @IsString()
  regionName: string;

  @IsString()
  regionId: string;
}

export class CreateApplicantDto {


  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @ValidateNested()
  @Type(() => UbicacionDto)
  ubication: UbicacionDto;
}
