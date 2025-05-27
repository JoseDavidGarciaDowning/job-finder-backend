import { Injectable} from '@nestjs/common';
import { db } from '../../drizzle/db/db';
import { company, users } from '../../drizzle/schema/schema'; 
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class CompanyRepository {
  async findByName(name: string) {
    return db.select().from(company).where(eq(company.name, name));
  }

  async create(dto: CreateCompanyDto) {
    return db.insert(company).values(dto).returning();
  }

  async findAllWithUser() {
    return db
      .select({
        companyId: company.id,
        companyName: company.name,
        description: company.description,
        userEmail: users.email,
      })
      .from(company)
      .innerJoin(users, eq(company.userId, users.id));
  }

  async findOneWithUser(id: string) {
    return db
      .select({
        companyId: company.id,
        companyName: company.name,
        description: company.description,
        userEmail: users.email,
      })
      .from(company)
      .innerJoin(users, eq(company.userId, users.id))
      .where(eq(company.id, id));
  }

  async update(id: string, dto: UpdateCompanyDto) {
    return db.update(company).set(dto).where(eq(company.id, id)).returning();
  }

  async remove(id: string) {
    return db.delete(company).where(eq(company.id, id)).returning();
  }
}
