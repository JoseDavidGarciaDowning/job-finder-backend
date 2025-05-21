import { Injectable } from '@nestjs/common';
import { db } from '../drizzle/db/db';
import {categories } from '../drizzle/schema/schema';
import { eq } from 'drizzle-orm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';



@Injectable()
export class CategoryService {
  create(createCategoryDto: CreateCategoryDto) {
    //return 'This action adds a new category';
    return db.insert(categories).values(createCategoryDto).returning();
  }

  findAll() {
    //return `This action returns all category`;
    return db.select().from(categories);
  }

  findOne(id: string) {
   // return `This action returns a #${id} category`;
    return db.select().from(categories).where(eq(categories.id, id));
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    //return `This action updates a #${id} category`;
    return db.update(categories).set(updateCategoryDto).where(eq(categories.id, id)).returning();
  }

  remove(id: string) {
    //return `This action removes a #${id} category`;
    return db.delete(categories).where(eq(categories.id, id)).returning();
  }
}
