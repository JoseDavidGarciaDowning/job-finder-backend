import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from 'src/drizzle/schema/schema';
import { eq } from 'drizzle-orm';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from 'src/drizzle/schema/schema';

@Injectable()
export class JobApplicationService {
  constructor(
    private readonly notificationsService: NotificationsService,
    @Inject(DRIZZLE) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(createJobApplicationDto: CreateJobApplicationDto,  userId: string) {
    const { jobId, status } = createJobApplicationDto;
    const newStatus = status || 'Enviada';
    const now = new Date();
    const [inserted] = await this.db.insert(schema.jobApplications).values({
      jobId,
      applicantId: userId, // Assuming user.id is the UUID of the applicant
      status: newStatus,
      createdAt: now,
      updatedAt: now,
    }).returning();
    return inserted;
  }

  async findAll() {
    return await this.db.select().from(schema.jobApplications);
  }

  findOne(id: number) {
    return `This action returns a #${id} jobApplication`;
  }

  async update(id: number, updateJobApplicationDto: UpdateJobApplicationDto) {
    const application = await this.db.query.jobApplications.findFirst({
      where: eq(schema.jobApplications.id, id),
    });

    if (!application) {
      throw new NotFoundException(`Job application with ID ${id} not found.`);
    }

    const newStatus = updateJobApplicationDto.status;
    await this.db
      .update(schema.jobApplications)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(schema.jobApplications.id, id));

    const { applicantId } = application;
    const title = 'Actualización en tu Postulación';
    const body = `El estado de tu postulación ha cambiado a: ${newStatus}.`;

    await this.notificationsService.sendNotificationToUser(applicantId, {
      title,
      body,
      data: { jobApplicationId: id.toString() }
    });

    return {
      message: `Job application ${id} updated successfully.`,
      newStatus,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} jobApplication`;
  }
}
