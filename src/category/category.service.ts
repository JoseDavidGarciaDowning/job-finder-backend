import {BadRequestException,ConflictException,Injectable,InternalServerErrorException,NotFoundException,} from '@nestjs/common';
import { CategoryRepository } from './././repository/category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { seedCategories } from './seeds/category.seed';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const existing = await this.categoryRepository.findCategoryByName(createCategoryDto.name);
      if (existing.length > 0) {
        throw new ConflictException(`La categoría "${createCategoryDto.name}" ya existe.`);
      }

      const created = await this.categoryRepository.create(createCategoryDto);
      return created[0];
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      throw new InternalServerErrorException('No se pudo crear la categoría.');
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {
      console.error('Error en findAll:', error);
      throw new InternalServerErrorException('No se pudieron obtener las categorías.');
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.categoryRepository.findById(id);
      if (result.length === 0) {
        throw new NotFoundException(`Categoría con id ${id} no encontrada.`);
      }
      return result[0];
    } catch (error) {
      console.error('Error en findOne:', error);
      throw new InternalServerErrorException('Error al buscar la categoría.');
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updated = await this.categoryRepository.update(id, updateCategoryDto);
      if (updated.length === 0) {
        throw new NotFoundException(`No se pudo actualizar. La categoría con id ${id} no existe.`);
      }
      return updated[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(`El nombre de la categoría ya existe: ${error.message}`);
      }
      console.error('Error al actualizar la categoría:', error);
      throw new InternalServerErrorException('No se pudo actualizar la categoría.');
    }
  }

  async remove(id: string) {
    try {
      await this.categoryRepository.deleteCategorySkills(id);
      const deleted = await this.categoryRepository.deleteCategory(id);

      if (deleted.length === 0) {
        throw new NotFoundException(`No se pudo eliminar la categoría con id ${id}, no existe.`);
      }

      return deleted[0];
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      throw new InternalServerErrorException('No se pudo eliminar la categoría.');
    }
  }

  async findCategoryByName(name: string){
   
      const categories = await this.categoryRepository.findCategoryByName(name);
      if (categories.length === 0) {
        throw new NotFoundException(`No se encontraron categorías con el nombre "${name}".`);
      }
      return categories;
   
  }

  async runSeed() {
    try {
      await seedCategories();
      return {
        success: true,
        message: 'Categories seed executed successfully'
      };
    } catch (error) {
      console.error('Error ejecutando el seed de categorías:', error);
      throw new InternalServerErrorException('No se pudo ejecutar el seed de categorías.');
    }
  }
}
