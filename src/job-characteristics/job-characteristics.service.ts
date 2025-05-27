import {Injectable,ConflictException,InternalServerErrorException,NotFoundException,} from '@nestjs/common';
import { JobCharacteristicsRepository } from '././repository/job-characteristics.repository';
import { CreateJobCharacteristicDto } from './dto/create-job-characteristic.dto';
import { UpdateJobCharacteristicDto } from './dto/update-job-characteristic.dto';

@Injectable()
export class JobCharacteristicsService {
  constructor(
    private readonly jobCharRepo: JobCharacteristicsRepository
  ) {}

  async create(dto: CreateJobCharacteristicDto) {
    try {
      const existing = await this.jobCharRepo.findByName(dto.name);
      if (existing.length > 0) {
        throw new ConflictException(`La característica del trabajo "${dto.name}" ya existe.`);
      }
      const created = await this.jobCharRepo.create(dto);
      return created[0];
    } catch (error) {
      console.error('Error al crear la característica del trabajo:', error);
      throw new InternalServerErrorException('No se pudo crear la característica del trabajo.');
    }
  }

  async findAll() {
    try {
      return await this.jobCharRepo.findAll();
    } catch (error) {
      console.error('Error al obtener las características del trabajo:', error);
      throw new InternalServerErrorException('No se pudieron obtener las características del trabajo.');
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.jobCharRepo.findById(id);
      if (result.length === 0) {
        throw new NotFoundException(`Característica del trabajo con id ${id} no encontrada.`);
      }
      return result[0];
    } catch (error) {
      console.error('Error al buscar la característica del trabajo:', error);
      throw new InternalServerErrorException('Error al buscar la característica del trabajo.');
    }
  }

  async update(id: string, dto: UpdateJobCharacteristicDto) {
    try {
      const updated = await this.jobCharRepo.update(id, dto);
      if (updated.length === 0) {
        throw new NotFoundException(`Característica del trabajo con id ${id} no encontrada.`);
      }
      return updated[0];
    } catch (error) {
      console.error('Error al actualizar la característica del trabajo:', error);
      throw new InternalServerErrorException('No se pudo actualizar la característica del trabajo.');
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.jobCharRepo.remove(id);
      if (deleted.length === 0) {
        throw new NotFoundException(`Característica del trabajo con id ${id} no encontrada.`);
      }
      return deleted[0];
    } catch (error) {
      console.error('Error al eliminar la característica del trabajo:', error);
      throw new InternalServerErrorException('No se pudo eliminar la característica del trabajo.');
    }
  }
}
