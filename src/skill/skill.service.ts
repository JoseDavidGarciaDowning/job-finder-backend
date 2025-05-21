import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { db } from '../drizzle/db/db';
import {skills } from '../drizzle/schema/schema';
import { eq } from 'drizzle-orm';
@Injectable()
export class SkillService {
  create(createSkillDto: CreateSkillDto) {
    //return 'This action adds a new skill';
    return db.insert(skills).values(createSkillDto).returning();
  }

  findAll() {
    //return `This action returns all skill`;
    return db.select().from(skills);
  }

  findOne(id: string) {
    //return `This action returns a #${id} skill`;
    return db.select().from(skills).where(eq(skills.id, id));
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    //return `This action updates a #${id} skill`;
    return db.update(skills).set(updateSkillDto).where(eq(skills.id, id)).returning();
  }

  remove(id: string) {
    //return `This action removes a #${id} skill`;
    return db.delete(skills).where(eq(skills.id, id)).returning();
  }
}
