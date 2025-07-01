import { relations } from 'drizzle-orm';
import { company } from '../../company/entities/company.entity';

import {
  pgTable,
  serial,
  text,
  varchar,
  pgEnum,
  json,
  date,
  numeric,
  uuid,
} from 'drizzle-orm/pg-core';

// Enum for workplace type
export const workplaceTypeEnum = pgEnum('workplace_type', [
  'remoto',
  'hibrido',
  'presencial',
]);

export const workScheduleEnum = pgEnum('work_schedule', [
  'tiempo_completo', // Full-time
  'medio_tiempo', // Part-time
  'por_horas', // Hourly
  'flexible', // Flexible schedule
  'jornada_rotativa', // Rotating shift
  'turno_nocturno', // Night shift
]);


// Enum for offer availability duration
export const offerDurationEnum = pgEnum('offer_duration', [
  '1_mes',
  '2_meses',
  '2_semanas',
  '3_a_5_meses',
]);

export const offer = pgTable('offer', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyId: uuid('company_id').references(() => company.id, {
    onDelete: 'cascade',
  }),
  companyName: text('company_name').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  salary: numeric('salary', { precision: 12, scale: 2 }).notNull(), // Formato numérico para el salario
  description: text('description').notNull(),
  responsibilities: text('responsibilities').notNull(),
  requirements: text('requirements').notNull(),
  workplaceType: workplaceTypeEnum('workplace_type').notNull(),
  workSchedule: workScheduleEnum('work_schedule'),
  offerDuration: offerDurationEnum('offer_duration').notNull(),
  ubication: json('ubication'),
  publishDate: date('publish_date').defaultNow(),
});

export const offerToCompany = relations(offer, ({ one }) => ({
  company: one(company, {
    fields: [offer.companyId],
    references: [company.id],
  }),
}));
