import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { FilterOfferDto } from './dto/filter-offer.dto';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @Auth(ValidRoles.company, ValidRoles.admin)
  create(@GetUser() user: User, @Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto, user.id);
  }

  @Get('company')
  @Auth(ValidRoles.company, ValidRoles.admin, ValidRoles.applicant)
  findAllMyOffers(@GetUser() user: User) {
    return this.offerService.findAllFromCompany(user.id);
  }
  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Post('filter')
  @Auth( ValidRoles.applicant, ValidRoles.admin)
  findOffersByFilter(@Body() filterOfferDto: FilterOfferDto) {
    return this.offerService.findOffersByFilter(filterOfferDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }
}
