import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategorySkillService } from './category-skill.service';
import { CreateCategorySkillDto } from './dto/create-category-skill.dto';
import { UpdateCategorySkillDto } from './dto/update-category-skill.dto';

@Controller('category-skill')
export class CategorySkillController {
  constructor(private readonly categorySkillService: CategorySkillService) {}

  @Post()
  create(@Body() createCategorySkillDto: CreateCategorySkillDto) {
    return this.categorySkillService.create(createCategorySkillDto);

  }

  @Get()
  findAll() {
    return this.categorySkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorySkillService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategorySkillDto: UpdateCategorySkillDto) {
    return this.categorySkillService.update(id, updateCategorySkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorySkillService.remove(id);
  }
}
