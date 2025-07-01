import {
  IsString,
  IsEnum,
  IsObject,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';


export enum WorkplaceType {
  REMOTE = 'remoto',
  HYBRID = 'hibrido',
  ONSITE = 'presencial',
}

export enum OfferDuration {
  ONE_MONTH = '1_mes',
  TWO_MONTHS = '2_meses',
  TWO_WEEKS = '2_semanas',
  THREE_TO_FIVE_MONTHS = '3_a_5_meses',
}

enum workScheduleEnum{
  tiempo_completo =  'tiempo_completo', // Full-time
  medio_tiempo = 'medio_tiempo', // Part-time
  por_horas = 'por_horas', // Hourly
  flexible = 'flexible', // Flexible schedule
  jornada_rotativa = 'jornada_rotativa', // Rotating shift
  turno_nocturno = 'turno_nocturno', // Night shift
}


export class SkillDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
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

export class CreateOfferDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  salary: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  responsibilities: string;

  @IsString()
  @IsNotEmpty()
  requirements: string;

  @IsEnum(WorkplaceType)
  workplaceType: WorkplaceType;

  @IsEnum(workScheduleEnum)
  workSchedule: workScheduleEnum;

  @IsEnum(OfferDuration)
  offerDuration: OfferDuration;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills: SkillDto[];

  @ValidateNested()
  @Type(() => UbicacionDto)
  ubication: UbicacionDto;
}
