import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferRepositoryService } from './repository/offer.repository.service';
import { FilterOfferDto } from './dto/filter-offer.dto';

@Injectable()
export class OfferService {

  constructor(
    private readonly offerRepositoryService: OfferRepositoryService, // Assuming you have a repository
  ){}


  create(createOfferDto: CreateOfferDto, userId: string) {
    return this.offerRepositoryService.createOffer(createOfferDto, userId);
  }

  findAllFromCompany(userId: string) {
    return this.offerRepositoryService.findAllOffersFromCompany(userId);
  }

  findAll() {
    return this.offerRepositoryService.findAllOffers();
  }

  findOne(id: string) {
    return this.offerRepositoryService.findOneOffer(id);
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }

  findOffersByFilter(filterOfferDto: FilterOfferDto) {
    return this.offerRepositoryService.findOffersByFilter(filterOfferDto);
  }
}
