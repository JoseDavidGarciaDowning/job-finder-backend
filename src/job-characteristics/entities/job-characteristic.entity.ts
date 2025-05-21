import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const jobCharacteristics = pgTable('job_characteristics', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 500 }), 
});

