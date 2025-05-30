import { DRIZZLE } from '@/src/drizzle/drizzle.module';
import { DrizzleDB } from '@/src/drizzle/types/drizzle';
import { Inject, Injectable } from '@nestjs/common';

import { applicants } from '../entities/applicant.entity';
import { CreateApplicantDto } from '../dto/create-applicant.dto';

@Injectable()
export class AppplicantRepositoryService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async createBaseApplicantProfile(
    createApplicantDto: CreateApplicantDto,
    userId: string,
  ) {
    const { firstName, lastName, ubication } = createApplicantDto;
    try {
      const result = await this.db
        .insert(applicants)
        .values({
          firstName,
          lastName,
          userId,
          ubication: JSON.stringify(ubication),
        })
        .returning();

      return result[0];
    } catch (error) {
      console.error(
        'Error creating applicant with names, user ID, and ubication:',
        error,
      );
      throw new Error(
        'Failed to create applicant with names, user ID, and ubication',
      );
    }
  }
}
