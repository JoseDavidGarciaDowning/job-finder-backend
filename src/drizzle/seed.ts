// import 'dotenv/config';
// import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import * as schema from './schema/schema';
// import { faker } from '@faker-js/faker';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL as string,
//   //   ssl: true,
// });
// const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

// async function main() {
//   const usersId = await Promise.all(
//     Array(50)
//       .fill('')
//       .map(async () => {
//         const user = await db
//           .insert(schema.users)
//           .values({
//             email: faker.internet.email(),
//             name: faker.person.firstName() + ' ' + faker.person.lastName(),
//             password: faker.internet.password(),
//           })
//           .returning();
//         return user[0].id;
//       }),
//   );

//   const postsId = await Promise.all(
//     Array(50)
//       .fill('')
//       .map(async () => {
//         const post = await db
//           .insert(schema.posts)
//           .values({
//             title: faker.lorem.sentence(),
//             content: faker.lorem.paragraph(),
//             authorId: faker.helpers.arrayElement(usersId),
//           })
//           .returning();
//         return post[0].id;
//       }),
//   );

//   await Promise.all(
//     Array(50)
//       .fill('')
//       .map(async () => {
//         const comment = await db
//           .insert(schema.comments)
//           .values({
//             text: faker.lorem.sentence(),
//             authorId: faker.helpers.arrayElement(usersId),
//             postId: faker.helpers.arrayElement(postsId),
//           })
//           .returning();
//         return comment[0].id;
//       }),
//   );

//   const insertedGroups = await db
//     .insert(schema.groups)
//     .values([
//       {
//         name: 'JS',
//       },
//       {
//         name: 'TS',
//       },
//       {
//         name: 'React',
//       },
//       {
//         name: 'NestJS',
//       },
//       {
//         name: 'Drizzle',
//       },
//     ])
//     .returning();

//   const groupsId = insertedGroups.map((group) => group.id);

//   await Promise.all(
//     usersId.map(async (userId) => {
//       return await db
//         .insert(schema.usersToGroups)
//         .values({
//           userId,
//           groupId: faker.helpers.arrayElement(groupsId),
//         })
//         .returning();
//     }),
//   );
// }

// main()
//   .then()
//   .catch((err) => {
//     console.log(err);
//     process.exit(0);
//   });
