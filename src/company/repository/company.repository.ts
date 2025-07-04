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
  async create(dto: CreateCompanyDto, userId: string) {
    try {
      return await db.insert(company).values({ ...dto, userId }).returning();
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  private handleDbErrors(error: any): never {
    // Manejo de errores comunes de bases de datos (ejemplo para PostgreSQL)
    if (error.code) {
      switch (error.code) {
        case '23505': // unique_violation
          throw new Error('Ya existe un registro con los mismos datos únicos.');
        case '23503': // foreign_key_violation
          throw new Error('Referencia a clave foránea no válida.');
        case '23502': // not_null_violation
          throw new Error('Falta un valor requerido.');
        case '22P02': // invalid_text_representation
          throw new Error('Formato de dato inválido.');
        case '42601': // syntax_error
          throw new Error('Error de sintaxis en la consulta.');
        default:
          throw new Error(`Error de base de datos: ${error.message || error}`);
      }
    }
    throw new Error(`Error inesperado en la base de datos: ${error.message || error}`);
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
