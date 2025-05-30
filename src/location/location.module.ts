import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationRepositoryService } from './repository/location.repository.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [
    DrizzleModule, // <---- importante importar aquí
  ],
  controllers: [LocationController],
  providers: [LocationService, LocationRepositoryService],
})
export class LocationModule {}
