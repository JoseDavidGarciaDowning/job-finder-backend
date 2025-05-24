import { db } from '../../drizzle/db/db';         
import { jobCharacteristics } from '../../drizzle/schema/schema'; 
import { eq } from 'drizzle-orm';

export async function seedJobCharacteristics() {
  const existing = await db.select().from(jobCharacteristics);

  if (existing.length === 0) {
    await db.insert(jobCharacteristics).values([
      { name: 'Remoto' },
      { name: 'Tiempo completo' },
      { name: 'Temporal' },
    ]);
    console.log('Características de empleo insertadas correctamente.');
  } else {
    console.log('Características ya existen, no se insertaron nuevamente.');
  }
}
seedJobCharacteristics();