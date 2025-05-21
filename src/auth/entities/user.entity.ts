import { boolean,uuid, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { roles } from './role.entity';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

export const users = pgTable('users', {
 id: uuid('id').primaryKey().defaultRandom()
,
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  currentRole: uuid('current_role')
  .notNull()
  .references(() => roles.id, { onDelete: 'set null' }),

});

export const usersRoles = relations(users, ({ one }) => ({
  role: one(roles, { fields: [users.currentRole], references: [roles.id] }),
}));

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
