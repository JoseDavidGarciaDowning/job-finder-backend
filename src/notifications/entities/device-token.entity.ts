import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { users } from '../../auth/entities/user.entity';

export const deviceTokens = pgTable('device_tokens', {
  token: text('token').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
}); 