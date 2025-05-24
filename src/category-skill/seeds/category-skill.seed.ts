import { db } from '../../drizzle/db/db';
import { categorySkills, categories, skills } from '../../drizzle/schema/schema';
import { eq } from 'drizzle-orm';

export async function seedCategorySkills() {
  const existing = await db.select().from(categorySkills);
  if (existing.length > 0) {
    console.log('categorySkills ya existen, no se insertaron nuevamente.');
    return;
  }

  const cat = Object.fromEntries(
    (await db.select().from(categories)).map(c => [c.name, c.id])
  );
  const sk = Object.fromEntries(
    (await db.select().from(skills)).map(s => [s.name, s.id])
  );

  await db.insert(categorySkills).values([
    { categoryId: cat['Educación'], skillId: sk['Python'] },
    { categoryId: cat['Educación'], skillId: sk['JavaScript'] },
    { categoryId: cat['Construcción'], skillId: sk['Electricidad básica'] },
    { categoryId: cat['Hotelera'], skillId: sk['Atención al cliente'] },
    { categoryId: cat['Alimenticia'], skillId: sk['Electricidad básica'] },
    { categoryId: cat['Tecnología'], skillId: sk['Python'] },
    { categoryId: cat['Tecnología'], skillId: sk['JavaScript'] },
    { categoryId: cat['Tecnología'], skillId: sk['Diseño gráfico'] },
  ]);

  console.log('categorySkills insertados correctamente.');
}

seedCategorySkills();
