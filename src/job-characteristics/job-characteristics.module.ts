import { Module } from '@nestjs/common';
import { JobCharacteristicsController } from './job-characteristics.controller';
import { JobCharacteristicsService } from './job-characteristics.service';

@Module({
  controllers: [JobCharacteristicsController],
  providers: [JobCharacteristicsService]
})
export class JobCharacteristicsModule {}
