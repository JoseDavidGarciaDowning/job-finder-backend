import { db } from '../../drizzle/db/db';         
import { company,users } from '../../drizzle/schema/schema'; 
import { eq } from 'drizzle-orm';

export async function seedCompanies() {
  // Busca el primer usuario existente
  const [user] = await db.select().from(users).limit(1);

  if (!user) {
    console.log('No hay usuarios en la tabla users. No se puede insertar compañías.');
    return;
  }

  const existing = await db.select().from(company);

  if (existing.length === 0) {
    await db.insert(company).values([
      { name: 'TechCorp', userId: user.id },
      { name: 'Construcciones CR', userId: user.id },
      { name: 'Educativa S.A.', userId: user.id },
      { name: 'Alimentos del Norte', userId: user.id },
      { name: 'Hotel Paraíso', userId: user.id },
    ]);

    console.log('Empresas insertadas correctamente.');
  } else {
    console.log('Las empresas ya existen, no se insertaron nuevamente.');
  }
}

seedCompanies();
