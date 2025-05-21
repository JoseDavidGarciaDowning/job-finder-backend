import { Injectable } from '@nestjs/common';
import { db } from '../drizzle/db/db';
import { CreateJobCharacteristicDto } from './dto/create-job-characteristic.dto';
import { UpdateJobCharacteristicDto } from './dto/update-job-characteristic.dto';
import { jobCharacteristics } from './entities/job-characteristic.entity';
import {eq} from 'drizzle-orm';


@Injectable()
export class JobCharacteristicsService {
 create(dto: CreateJobCharacteristicDto){
   //  return;
    return db.insert(jobCharacteristics).values(dto).returning();
 }

 findAll(){
    //return;
    return db.select().from(jobCharacteristics);
 }
 findOne(id:string){
    //return;
    return db.select().from(jobCharacteristics).where(eq(jobCharacteristics.id, id));
 }
 update(id:string, dto: UpdateJobCharacteristicDto){
   // return;
    return db.update(jobCharacteristics).set(dto).where(eq(jobCharacteristics.id, id)).returning();
 }
 remove(id: string){
    ///return;
    return db.delete(jobCharacteristics).where(eq(jobCharacteristics.id, id)).returning();
 }
}
