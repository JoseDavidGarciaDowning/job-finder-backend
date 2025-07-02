import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  findAll() {
    return this.skillService.findAll();
  }
  @Get('/by-category/:categoryId')
  findAllSkillsByCategory(@Param('categoryId') categoryId: string) {
    return this.skillService.findAllSkillsByCategory(categoryId);
  }
  @Get('/by-category/:categoryId/:name')
  findSkillsByNameFromCategory(@Param('categoryId') categoryId: string, @Param('name') name: string) {
    return this.skillService.findSkillsByNameFromCategory(categoryId, name);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillService.update(id, updateSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillService.remove(id);
  }

  @Post('seed')
  runSeed() {
    return this.skillService.runSeed();
  }
}
