import { CreateOfferDto } from '../dto/create-offer.dto';
import { company } from '../../company/entities/company.entity';
import { offer } from '../entities/offer.entity';
import { DRIZZLE } from '../../drizzle/drizzle.module';
import { DrizzleDB } from '../../drizzle/types/drizzle';
import { Inject, Injectable } from '@nestjs/common';
import { offerSkills } from '../entities/offer-skill.entity';
import { FilterOfferDto } from '../dto/filter-offer.dto';
import { eq, and, inArray, gt, sql, lt } from 'drizzle-orm';
import { skills } from '@/src/skill/entities/skill.entity';
import { categorySkills } from '@/src/category-skill/entities/category-skill.entity';

@Injectable()
export class OfferRepositoryService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async createOffer(createOfferDto: CreateOfferDto, userId: string) {
    const { skills, ...offerData } = createOfferDto;
    // Obtener el perfil de la empresa basado en el userId
    const companyProfile = await this.db.query.company.findFirst({
      where: (company, { eq }) => eq(company.userId, userId),
    });

    if (!companyProfile) {
      throw new Error(
        'No se encontró el perfil de la empresa para este usuario',
      );
    }

    // Insertar la oferta usando el company_id obtenido
    const newOffer = await this.db
      .insert(offer)
      .values({
        ...offerData,
        salary: offerData.salary.toString(), // Deja salary como number
        companyId: companyProfile.id, // Usa el nombre correcto de la columna
        companyName: companyProfile.name, // Usa el nombre correcto de la columna
      })
      .returning();

      //insertar las skills en la tabla intermedia offer-skill

      await this.db
        .insert(offerSkills)
        .values(
          skills.map((skill) => ({
            offerId: newOffer[0].id,
            skillId: skill.id,
          })),
        )
        .returning();

    return newOffer[0];
  }

  async findAllOffersFromCompany(userId: string) {
    // Obtener el perfil de la empresa basado en el userId
    const companyProfile = await this.db.query.company.findFirst({
      where: (company, { eq }) => eq(company.userId, userId),
    });

    if (!companyProfile) {
      throw new Error(
        'No se encontró el perfil de la empresa para este usuario',
      );
    }

    // Obtener todas las ofertas asociadas a la empresa
    const offers = await this.db.query.offer.findMany({
      where: (offer, { eq }) => eq(offer.companyId, companyProfile.id),
    });

    return offers;
  }

  async findAllOffers() {
    // Obtener todas las ofertas
    const offers = await this.db.query.offer.findMany();
    return offers;
  }

  async findOneOffer(id: string) {
    // Obtener una oferta específica por su ID
    const offerData = await this.db.query.offer.findFirst({
      where: (offer, { eq }) => eq(offer.id, id),
    });

    if (!offerData) {
      throw new Error(`No se encontró la oferta con ID ${id}`);
    }

    return offerData;
  }

  async findOffersByFilter(filterOfferDto: FilterOfferDto) {
    const {
      skillId, // <- importante
      regionId,
      workplaceType,
      workSchedule,
      salaryMin,
      salaryMax,
    } = filterOfferDto;
  
      const offers = await this.db
    .select()
    .from(offer)
    .innerJoin(offerSkills, eq(offerSkills.offerId, offer.id))
    .where(
      and(
        eq(offerSkills.skillId, skillId),
        eq(sql`(offer.ubication->>'regionId')`, regionId),
        gt(offer.salary, salaryMin.toString()),
        lt(offer.salary, salaryMax.toString()),
        eq(offer.workplaceType, workplaceType),
        eq(offer.workSchedule, workSchedule),
      )
    );

  
    return offers;
  }
  
}
