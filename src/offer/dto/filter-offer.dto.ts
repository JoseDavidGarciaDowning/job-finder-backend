import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";





enum WorkplaceType {
    REMOTE = 'remoto',
    HYBRID = 'hibrido',
    ONSITE = 'presencial',
}

enum workScheduleEnum{
   tiempo_completo =  'tiempo_completo', // Full-time
   medio_tiempo = 'medio_tiempo', // Part-time
   por_horas = 'por_horas', // Hourly
   flexible = 'flexible', // Flexible schedule
   jornada_rotativa = 'jornada_rotativa', // Rotating shift
   turno_nocturno = 'turno_nocturno', // Night shift
}


export class FilterOfferDto{

    @IsString()
    categoryId: string;

    @IsString()
    skillId: string;
    @IsString() 
    regionId: string;

    @IsEnum(WorkplaceType)
    workplaceType: WorkplaceType;

    @IsEnum(workScheduleEnum)
    workSchedule: workScheduleEnum;
    @IsNumber()
    salaryMin: number;
    @IsNumber()
    salaryMax: number;


}