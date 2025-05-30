import { pgTable, PgTable,uuid, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable('category',
    {
        id:uuid('id').primaryKey().defaultRandom(),
        name:varchar('name',{length: 255}).notNull(),
    });



