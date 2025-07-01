import { Test, TestingModule } from '@nestjs/testing';
import { OfferRepositoryService } from './offer.repository.service';

describe('OfferRepositoryService', () => {
  let service: OfferRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferRepositoryService],
    }).compile();

    service = module.get<OfferRepositoryService>(OfferRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
