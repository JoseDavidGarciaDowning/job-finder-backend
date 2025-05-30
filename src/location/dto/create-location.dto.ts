import { IsNotEmpty, IsString } from "class-validator";

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  countryName: string;
  @IsString()
  @IsNotEmpty()
  countryId: string;
  @IsString()
  @IsNotEmpty()
  regionName: string;
  @IsString()
  @IsNotEmpty()
  regionId: string;
}
