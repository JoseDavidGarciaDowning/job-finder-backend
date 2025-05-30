import { DRIZZLE } from '@/src/drizzle/drizzle.module';
import { DrizzleDB } from '@/src/drizzle/types/drizzle';
import { Inject, Injectable } from '@nestjs/common';
import { CreateLocationDto } from '../dto/create-location.dto';
import { User } from '@/src/auth/entities/user.entity';
import { applicants } from '../../applicant/entities/applicant.entity';
import { eq } from 'drizzle-orm';

@Injectable()
export class LocationRepositoryService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async saveLocationData(createLocationDto: CreateLocationDto, user: User) {
    try {
    } catch (error) {
      console.error('Error saving location data:', error);
      throw new Error('Failed to save location data');
    }
  }
  async updateApplicantLocation(userId: string, dto: CreateLocationDto) {
    try {
      await this.db
        .update(applicants)
        .set({
          ubication: dto, // se guarda como JSON porque el campo es tipo json()
        })
        .where(eq(applicants.userId, userId));
    } catch (error) {
      console.error('Error updating location:', error);
      throw new Error('Failed to update location');
    }
  }
}
