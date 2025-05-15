import { integer, json, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const applicants = pgTable('applicants', {
  id: serial('id').primaryKey().notNull(),
  idExperienciaLaboral: integer('id_experiencia_laboral'),
  idEducacion: integer('id_educacion'),
  fullName: text('full_name').notNull(),
  ubicacion: json('ubicacion'),
  profilePictureUrl: text('profile_picture_url'),
  bio: text('bio'),
});
