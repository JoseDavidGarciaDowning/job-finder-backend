import { db } from '../../drizzle/db/db';         // o '../drizzle/db' si es una sola carpeta arriba
import { categories } from '../../drizzle/schema/schema'; 
import { eq } from 'drizzle-orm';

export async function seedCategories() {
  const existing = await db.select().from(categories);

  if (existing.length === 0) {
    await db.insert(categories).values([
      { name: 'Tecnología' },
      { name: 'Construcción' },
      { name: 'Educación' },
      { name: 'Alimenticia' },
      { name: 'Hotelera' },
    ]);
    console.log('Categorías insertadas correctamente.');
  } else {
    console.log('Categorías ya existen, no se insertaron nuevamente.');
  }
}
seedCategories();