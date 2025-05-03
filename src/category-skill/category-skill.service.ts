import { Injectable } from '@nestjs/common';
import { CreateCategorySkillDto } from './dto/create-category-skill.dto';
import { UpdateCategorySkillDto } from './dto/update-category-skill.dto';

@Injectable()
export class CategorySkillService {
  create(createCategorySkillDto: CreateCategorySkillDto) {
    return 'This action adds a new categorySkill';
  }

  findAll() {
    return `This action returns all categorySkill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categorySkill`;
  }

  update(id: number, updateCategorySkillDto: UpdateCategorySkillDto) {
    return `This action updates a #${id} categorySkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} categorySkill`;
  }
}
