
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { users} from '../../auth/entities/user.entity'; 

export const company = pgTable('company', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  userId: uuid('user_id').notNull().references(() => users.id),
  description: varchar('description', { length: 500 }),
  locationId: uuid('location_id'),
});


