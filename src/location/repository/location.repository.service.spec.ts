import { Test, TestingModule } from '@nestjs/testing';
import { LocationRepositoryService } from './location.repository.service';

describe('LocationRepositoryService', () => {
  let service: LocationRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationRepositoryService],
    }).compile();

    service = module.get<LocationRepositoryService>(LocationRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
