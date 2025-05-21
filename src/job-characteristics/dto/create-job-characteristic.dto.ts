import { IsString,Length } from "class-validator";

export class CreateJobCharacteristicDto{
    @IsString()
    @Length(1, 255)
    name: string;
    @IsString()
  description: string;
}