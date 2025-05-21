import { PartialType } from "@nestjs/mapped-types";
import { CreateJobCharacteristicDto } from "./create-job-characteristic.dto";

export class UpdateJobCharacteristicDto extends PartialType(CreateJobCharacteristicDto){}