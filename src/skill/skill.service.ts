import {Injectable,ConflictException,InternalServerErrorException,NotFoundException,} from '@nestjs/common';
import { SkillRepository } from '././repository/skill.repository';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { seedSkills } from './seeds/skill.seed';

@Injectable()
export class SkillService {
  constructor(private readonly skillRepository: SkillRepository) {}

  async create(createSkillDto: CreateSkillDto) {
    try {
      const existing = await this.skillRepository.findByName(createSkillDto.name);
      if (existing.length > 0) {
        throw new ConflictException('Ya existe una habilidad con ese nombre.');
      }

      const created = await this.skillRepository.create(createSkillDto);
      return created[0];
    } catch (error) {
      console.error('Error al crear la habilidad:', error);
      throw new InternalServerErrorException('No se pudo crear la habilidad.');
    }
  }

  async findAll() {
    return await this.skillRepository.findAll();
  }

  async findOne(id: string) {
    const skill = await this.skillRepository.findById(id);

    if (skill.length === 0) {
      throw new NotFoundException(`No se encontró la habilidad con id ${id}.`);
    }

    return skill[0];
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    try {
      const updated = await this.skillRepository.update(id, updateSkillDto);

      if (updated.length === 0) {
        throw new NotFoundException(`No se pudo actualizar. La habilidad con id ${id} no existe.`);
      }

      return updated[0];
    } catch (error) {
      console.error('Error al actualizar la habilidad:', error);
      throw new InternalServerErrorException('No se pudo actualizar la habilidad.');
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.skillRepository.remove(id);

      if (deleted.length === 0) {
        throw new NotFoundException(`No se pudo eliminar. La habilidad con id ${id} no existe.`);
      }

      return deleted[0];
    } catch (error) {
      console.error('Error al eliminar la habilidad:', error);
      throw new InternalServerErrorException('No se pudo eliminar la habilidad.');
    }
  }
  async findAllSkillsByCategory(categoryId: string) {
    try {
      const skills = await this.skillRepository.findAllSkillsByCategory(categoryId);
      if (skills.length === 0) {
        throw new NotFoundException(`No se encontraron habilidades para la categoría con id ${categoryId}.`);
      }
      return skills;
    } catch (error) {
      console.error('Error al buscar habilidades por categoría:', error);
      throw new InternalServerErrorException('No se pudieron obtener las habilidades de la categoría.');
    }
  }
  async findSkillsByNameFromCategory(categoryId: string, name: string) {
 
      const skill = await this.skillRepository.findSkillsByNameFromCategory(categoryId, name);
      if (skill.length === 0) {
        throw new NotFoundException(`No se encontró la habilidad con nombre "${name}" para la categoría seleccionada`);
      }
      return skill;
   
  }

  async runSeed() {
    try {
      await seedSkills();
      return { 
        success: true, 
        message: 'Skills seed executed successfully' 
      };
    } catch (error) {
      console.error('Error executing skills seed:', error);
      throw new InternalServerErrorException('No se pudo ejecutar el seed de skills.');
    }
  }
}
