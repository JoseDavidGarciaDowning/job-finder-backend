import { Injectable } from '@nestjs/common';
import { db } from '../../drizzle/db/db';
import { categorySkills, categories, skills } from '../../drizzle/schema/schema';
import { CreateCategorySkillDto } from '../dto/create-category-skill.dto';
import { UpdateCategorySkillDto } from '../dto/update-category-skill.dto';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class CategorySkillRepository {
  async findDuplicate(categoryId: string, skillId: string) {
    return db
      .select()
      .from(categorySkills)
      .where(and(
        eq(categorySkills.categoryId, categoryId),
        eq(categorySkills.skillId, skillId)
      ));
  }

  async create(dto: CreateCategorySkillDto) {
    return db.insert(categorySkills).values(dto).returning();
  }

  async findAll() {
    return db
      .select({
        id: categorySkills.id,
        category: {
          id: categories.id,
          name: categories.name,
        },
        skill: {
          id: skills.id,
          name: skills.name,
        },
      })
      .from(categorySkills)
      .innerJoin(categories, eq(categorySkills.categoryId, categories.id))
      .innerJoin(skills, eq(categorySkills.skillId, skills.id));
  }

  async findById(id: string) {
    return db
      .select({
        id: categorySkills.id,
        category: {
          id: categories.id,
          name: categories.name,
        },
        skill: {
          id: skills.id,
          name: skills.name,
        },
      })
      .from(categorySkills)
      .innerJoin(categories, eq(categorySkills.categoryId, categories.id))
      .innerJoin(skills, eq(categorySkills.skillId, skills.id))
      .where(eq(categorySkills.id, id));
  }

  async update(id: string, dto: UpdateCategorySkillDto) {
    return db.update(categorySkills).set(dto).where(eq(categorySkills.id, id)).returning();
  }

  async remove(id: string) {
    return db.delete(categorySkills).where(eq(categorySkills.id, id)).returning();
  }
}
