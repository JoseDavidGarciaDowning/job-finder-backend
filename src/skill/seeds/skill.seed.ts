import { db } from '../../drizzle/db/db';         
import { skills } from '../../drizzle/schema/schema'; 
import { eq } from 'drizzle-orm';

export async function seedSkills() {
  const existing = await db.select().from(skills);

  if (existing.length === 0) {
    await db.insert(skills).values([
      { name: 'JavaScript' },
      { name: 'Python' },
      { name: 'Diseño gráfico' },
      { name: 'Atención al cliente' },
      { name: 'Electricidad básica' },
    ]);
    console.log('Habilidades insertadas correctamente.');
  } else {
    console.log('Las habilidades ya existen, no se insertaron nuevamente.');
  }
}

seedSkills();
