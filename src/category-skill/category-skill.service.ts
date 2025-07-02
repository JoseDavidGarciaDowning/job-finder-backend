import {ConflictException,Injectable,InternalServerErrorException,NotFoundException,} from '@nestjs/common';
import { CategorySkillRepository } from '././repository/category-skill.repository';
import { CreateCategorySkillDto } from './dto/create-category-skill.dto';
import { UpdateCategorySkillDto } from './dto/update-category-skill.dto';
import { seedCategorySkills } from './seeds/category-skill.seed';

@Injectable()
export class CategorySkillService {
  constructor(private readonly categorySkillRepository: CategorySkillRepository) {}

  async create(dto: CreateCategorySkillDto) {
    try {
      const existing = await this.categorySkillRepository.findDuplicate(dto.categoryId, dto.skillId);
      if (existing.length > 0) {
        throw new ConflictException('Ya existe esta relación entre categoría y habilidad.');
      }

      const created = await this.categorySkillRepository.create(dto);
      return created[0];
    } catch (error) {
      console.error('Error al crear la relación:', error);
      throw new InternalServerErrorException('No se pudo crear la relación.');
    }
  }

  async findAll() {
    try {
      return await this.categorySkillRepository.findAll();
    } catch (error) {
      console.error('Error al obtener relaciones:', error);
      throw new InternalServerErrorException('No se pudieron obtener las relaciones.');
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.categorySkillRepository.findById(id);
      if (result.length === 0) {
        throw new NotFoundException(`La relación con id ${id} no existe.`);
      }
      return result[0];
    } catch (error) {
      console.error('Error al obtener la relación:', error);
      throw new InternalServerErrorException('No se pudo obtener la relación.');
    }
  }

  async update(id: string, dto: UpdateCategorySkillDto) {
    try {
      const updated = await this.categorySkillRepository.update(id, dto);
      if (updated.length === 0) {
        throw new NotFoundException(`No se encontró la relación con id ${id}.`);
      }
      return updated[0];
    } catch (error) {
      console.error('Error al actualizar la relación:', error);
      throw new InternalServerErrorException('No se pudo actualizar la relación.');
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.categorySkillRepository.remove(id);
      if (deleted.length === 0) {
        throw new NotFoundException(`No se encontró la relación con id ${id}.`);
      }
      return deleted[0];
    } catch (error) {
      console.error('Error al eliminar la relación:', error);
      throw new InternalServerErrorException('No se pudo eliminar la relación.');
    }
  }

  async runSeed() {
    try {
      await seedCategorySkills();
      return { 
        success: true, 
        message: 'Category-Skills seed executed successfully' 
      };
    } catch (error) {
      console.error('Error executing category-skills seed:', error);
      throw new InternalServerErrorException('No se pudo ejecutar el seed de category-skills.');
    }
  }
}
