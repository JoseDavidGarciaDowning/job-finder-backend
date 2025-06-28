import { IsOptional, IsString, IsUUID, IsInt } from 'class-validator';

export class CreateJobApplicationDto {
  @IsInt()
  jobId: number;

  @IsUUID()
  applicantId: string;

  @IsString()
  @IsOptional() // Opcional en la creación, pero definido.
  status?: string;
}
