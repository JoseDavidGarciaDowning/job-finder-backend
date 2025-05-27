import { Injectable } from '@nestjs/common';
import { db } from '../../drizzle/db/db';
import { eq } from 'drizzle-orm';
import { jobCharacteristics } from '../entities/job-characteristic.entity';
import { CreateJobCharacteristicDto } from '../dto/create-job-characteristic.dto';
import { UpdateJobCharacteristicDto } from '../dto/update-job-characteristic.dto';

@Injectable()
export class JobCharacteristicsRepository {
  async findByName(name: string) {
    return db.select().from(jobCharacteristics).where(eq(jobCharacteristics.name, name));
  }

  async create(dto: CreateJobCharacteristicDto) {
    return db.insert(jobCharacteristics).values(dto).returning();
  }

  async findAll() {
    return db.select().from(jobCharacteristics);
  }

  async findById(id: string) {
    return db.select().from(jobCharacteristics).where(eq(jobCharacteristics.id, id));
  }

  async update(id: string, dto: UpdateJobCharacteristicDto) {
    return db.update(jobCharacteristics).set(dto).where(eq(jobCharacteristics.id, id)).returning();
  }

  async remove(id: string) {
    return db.delete(jobCharacteristics).where(eq(jobCharacteristics.id, id)).returning();
  }
}
