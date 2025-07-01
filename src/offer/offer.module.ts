import { Module } from '@nestjs/common';

import { OfferController } from './offer.controller';
import { OfferRepositoryService } from './repository/offer.repository.service';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { OfferService } from './offer.service';

@Module({
  imports: [
    DrizzleModule, 
    AuthModule,
  ], 
  controllers: [OfferController],
  providers: [OfferRepositoryService, OfferService],
})
export class OfferModule {}
