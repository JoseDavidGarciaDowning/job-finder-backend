import { Injectable } from '@nestjs/common';
import { db } from '../../drizzle/db/db';
import { categories, categorySkills } from '../../drizzle/schema/schema';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class CategoryRepository {
  async findByName(name: string) {
    return db.select().from(categories).where(eq(categories.name, name));
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return db.insert(categories).values(createCategoryDto).returning();
  }

  async findAll() {
    return db.select().from(categories);
  }

  async findById(id: string) {
    return db.select().from(categories).where(eq(categories.id, id));
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return db.update(categories).set(updateCategoryDto).where(eq(categories.id, id)).returning();
  }

  async deleteCategorySkills(id: string) {
    return db.delete(categorySkills).where(eq(categorySkills.categoryId, id));
  }

  async deleteCategory(id: string) {
    return db.delete(categories).where(eq(categories.id, id)).returning();
  }
}
