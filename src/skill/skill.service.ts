import {Injectable,ConflictException,InternalServerErrorException,NotFoundException,} from '@nestjs/common';
import { SkillRepository } from '././repository/skill.repository';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

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
}
