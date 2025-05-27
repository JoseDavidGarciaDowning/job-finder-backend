import { Module } from '@nestjs/common';
import { JobCharacteristicsController } from './job-characteristics.controller';
import { JobCharacteristicsService } from './job-characteristics.service';
import { JobCharacteristicsRepository } from '././repository/job-characteristics.repository';
@Module({
  controllers: [JobCharacteristicsController],
  providers: [JobCharacteristicsService,JobCharacteristicsRepository]
})
export class JobCharacteristicsModule {}
