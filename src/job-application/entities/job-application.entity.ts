import { pgTable, serial, varchar, timestamp, integer, uuid } from 'drizzle-orm/pg-core';
import { users } from '../../auth/entities/user.entity';


export const jobApplications = pgTable('job_applications', {
  id: serial('id').primaryKey(),
  
  
  
  //  placeholder para jobId por ahora
  jobId: integer('job_id').notNull(),

  applicantId: uuid('applicant_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  status: varchar('status', { length: 50 }).notNull().default('Enviada'), // 'Enviada', 'En revisión', 'Aceptada', 'Rechazada'
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type JobApplication = typeof jobApplications.$inferSelect;
export type NewJobApplication = typeof jobApplications.$inferInsert;
