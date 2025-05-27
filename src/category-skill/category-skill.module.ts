import { Module } from '@nestjs/common';
import { CategorySkillService } from './category-skill.service';
import { CategorySkillController } from './category-skill.controller';
import { CategorySkillRepository } from '././repository/category-skill.repository';
@Module({
  controllers: [CategorySkillController],
  providers: [CategorySkillService, CategorySkillRepository],
})
export class CategorySkillModule {}
