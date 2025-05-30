import { InferSelectModel, relations } from 'drizzle-orm';
import { users } from '../../auth/entities/user.entity';
import {
  integer,
  json,
  pgTable,
  serial,
  text,
  uuid,
} from 'drizzle-orm/pg-core';

export const applicants = pgTable('applicants', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  idLaboralExperience: integer('id_laboral_experience'),
  idEducation: integer('id_education'),
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  ubication: json('ubication'),
  profilePictureUrl: text('profile_picture_url'),
  bio: text('bio'),
});

export type Applicant = InferSelectModel<typeof applicants>;
// export type NewApplicant = Omit<Applicant, 'id'>;

export const applicantRelations = relations(applicants, ({ one }) => ({
  user: one(users, {
    fields: [applicants.userId],
    references: [users.id],
  }),
}));

export const userstoApplicant = relations(users, ({ one }) => ({
  applicant: one(applicants, {
    fields: [users.id],
    references: [applicants.userId],
  }),
}));
