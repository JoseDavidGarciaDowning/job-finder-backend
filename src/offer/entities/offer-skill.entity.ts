import { integer, serial, pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { offer } from './offer.entity';
import { skills } from '../../skill/entities/skill.entity';


export const offerSkills = pgTable('offer_skills', {
    id: uuid('id').primaryKey().defaultRandom(),
    offerId: uuid('offer_id').notNull().references(() => offer.id, { onDelete: 'cascade' }),
    skillId: uuid('skill_id').notNull().references(() => skills.id, { onDelete: 'cascade' }),
});

export const offerSkillsRelations = relations(offerSkills, ({ one }) => ({
    offer: one(offer, {
        fields: [offerSkills.offerId],
        references: [offer.id],
    }),
    skill: one(skills, {
        fields: [offerSkills.skillId],
        references: [skills.id],
    }),
}));

export const offerRelations = relations(offer, ({ many }) => ({
  offerSkills: many(offerSkills),
}));

export const skillRelations = relations(skills, ({ many }) => ({
  offerSkills: many(offerSkills),
}));
  
  
