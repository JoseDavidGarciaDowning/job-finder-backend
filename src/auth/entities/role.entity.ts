import { InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';
import { users } from './user.entity';

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
});

export const roleToUser = relations(roles, ({ many }) => ({
  users: many(users),
}));



export type Role = InferSelectModel<typeof roles>;

export type NewRole = InferSelectModel<typeof roles>;