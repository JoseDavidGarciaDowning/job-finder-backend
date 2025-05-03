import { Module } from '@nestjs/common';
import { CategorySkillService } from './category-skill.service';
import { CategorySkillController } from './category-skill.controller';

@Module({
  controllers: [CategorySkillController],
  providers: [CategorySkillService],
})
export class CategorySkillModule {}
