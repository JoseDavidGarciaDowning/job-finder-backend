import 'dotenv/config';

import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../drizzle/schema/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
  //   ssl: true,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function main() {
  const rolesToInsert = ['admin', 'applicant', 'company'];

  // Fetch existing roles
  const existingRoles = await db
    .select({ name: schema.roles.name })
    .from(schema.roles);

  const existingRoleNames = existingRoles.map((role) => role.name);

  // Filter roles that are not already in the database
  const rolesToAdd = rolesToInsert
    .filter((role) => !existingRoleNames.includes(role))
    .map((name) => ({ name }));

  if (rolesToAdd.length > 0) {
    await db.insert(schema.roles).values(rolesToAdd).returning();
    console.log('New roles seeded successfully');
  } else {
    console.log('No new roles to seed');
  }
}

main()
  .then(() => {
    console.log('Seeding process completed');
  })
  .catch((error) => {
    console.error('Error seeding roles:', error);
  })
  .finally(async () => {
    await pool.end();
  });
