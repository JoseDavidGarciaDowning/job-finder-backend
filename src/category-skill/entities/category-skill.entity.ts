import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { categories } from '../../category/entities/category.entity';
import { skills } from '../../skill/entities/skill.entity';


export const categorySkills = pgTable('category_skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  categoryId: uuid('category_id').notNull().references(() => categories.id),
  skillId: uuid('skill_id').notNull().references(() => skills.id),
});



export class CategorySkill {}
