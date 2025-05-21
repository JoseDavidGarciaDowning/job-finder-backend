import { IsUUID } from "class-validator";

export class CreateCategorySkillDto {
    @IsUUID()
    categoryId: string;
    
    @IsUUID()
    skillId: string;
}
