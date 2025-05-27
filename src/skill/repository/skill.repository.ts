import { Injectable } from '@nestjs/common';
import { db } from '../../drizzle/db/db';
import { skills } from '../../drizzle/schema/schema';
import { eq } from 'drizzle-orm';
import { CreateSkillDto } from '../dto/create-skill.dto';
import { UpdateSkillDto } from '../dto/update-skill.dto';

@Injectable()
export class SkillRepository {
  async findByName(name: string) {
    return db.select().from(skills).where(eq(skills.name, name));
  }

  async create(dto: CreateSkillDto) {
    return db.insert(skills).values(dto).returning();
  }

  async findAll() {
    return db.select().from(skills);
  }

  async findById(id: string) {
    return db.select().from(skills).where(eq(skills.id, id));
  }

  async update(id: string, dto: UpdateSkillDto) {
    return db.update(skills).set(dto).where(eq(skills.id, id)).returning();
  }

  async remove(id: string) {
    return db.delete(skills).where(eq(skills.id, id)).returning();
  }
}
