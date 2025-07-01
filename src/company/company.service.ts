import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, } from '@nestjs/common';
import { CompanyRepository } from './repository/company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { userRoles } from '../auth/entities/user-role.entity';


@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(dto: CreateCompanyDto, userId: string) {
    try {
      const existing = await this.companyRepository.findByName(dto.name);

      if (existing.length > 0) {
        throw new ConflictException('Ya existe una compañía con ese nombre.');
      }

      return await this.companyRepository.create(dto, userId);
    } catch (error) {
      console.error('Error al crear la compañía:', error);
      throw new InternalServerErrorException('No se pudo crear la compañía.');
    }
  }

  async findAll() {
    try {
      return await this.companyRepository.findAllWithUser();
    } catch (error) {
      console.error('Error al obtener las compañías:', error);
      throw new InternalServerErrorException('No se pudieron obtener las compañías.');
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.companyRepository.findOneWithUser(id);

      if (result.length === 0) {
        throw new NotFoundException(`No se encontró la compañía con id ${id}.`);
      }

      return result[0];
    } catch (error) {
      console.error('Error al obtener la compañía:', error);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('No se pudo obtener la compañía.');
    }
  }

  async update(id: string, dto: UpdateCompanyDto) {
    try {
      const updated = await this.companyRepository.update(id, dto);

      if (updated.length === 0) {
        throw new NotFoundException(`No se pudo actualizar. La compañía con id ${id} no existe.`);
      }

      return updated[0];
    } catch (error) {
      console.error('Error al actualizar la compañía:', error);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('No se pudo actualizar la compañía.');
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.companyRepository.remove(id);

      if (deleted.length === 0) {
        throw new NotFoundException(`No se pudo eliminar. La compañía con id ${id} no existe.`);
      }

      return deleted[0];
    } catch (error) {
      console.error('Error al eliminar la compañía:', error);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException('No se pudo eliminar la compañía.');
    }
  }
}
