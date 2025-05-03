import { PartialType } from '@nestjs/mapped-types';
import { CreateCategorySkillDto } from './create-category-skill.dto';

export class UpdateCategorySkillDto extends PartialType(CreateCategorySkillDto) {}
