// import { Injectable } from '@nestjs/common';
// import { db } from '../drizzle/db/db';
// import { categorySkills } from '../drizzle/schema/schema';
// import { CreateCategorySkillDto } from './dto/create-category-skill.dto';
// import { UpdateCategorySkillDto } from './dto/update-category-skill.dto';
// import { eq } from 'drizzle-orm';

// @Injectable()
// export class CategorySkillService {
//   create(createCategorySkillDto: CreateCategorySkillDto) {
   
//     return db.insert(categorySkills).values(createCategorySkillDto).returning();
//   }

//   findAll() {
    
//       return db.select().from(categorySkills);

//   }

//   findOne(id: string) {
  
//        return db.select().from(categorySkills).where(eq(categorySkills.id, id));

//   }

//   update(id: string, updateCategorySkillDto: UpdateCategorySkillDto) {
  
//     return db.update(categorySkills).set(updateCategorySkillDto).where(eq(categorySkills.id, id)).returning();

//   }

//   remove(id: string) {
   
//     return db.delete(categorySkills).where(eq(categorySkills.id, id)).returning();

//   }
// }
import { Injectable } from '@nestjs/common';
import { db } from '../drizzle/db/db';
import { categorySkills, categories, skills } from '../drizzle/schema/schema';
import { CreateCategorySkillDto } from './dto/create-category-skill.dto';
import { UpdateCategorySkillDto } from './dto/update-category-skill.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class CategorySkillService {
  create(createCategorySkillDto: CreateCategorySkillDto) {
    return db.insert(categorySkills).values(createCategorySkillDto).returning();
  }

  async findAll() {
    return db
      .select({
        id: categorySkills.id,
        category: {
          id: categories.id,
          name: categories.name
        },
        skill: {
          id: skills.id,
          name: skills.name
        }
      })
      .from(categorySkills)
      .innerJoin(categories, eq(categorySkills.categoryId, categories.id))
      .innerJoin(skills, eq(categorySkills.skillId, skills.id));
  }

 findOne(id: string) {
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


  update(id: string, updateCategorySkillDto: UpdateCategorySkillDto) {
    return db
      .update(categorySkills)
      .set(updateCategorySkillDto)
      .where(eq(categorySkills.id, id))
      .returning();
  }

  remove(id: string) {
    return db.delete(categorySkills).where(eq(categorySkills.id, id)).returning();
  }
}
