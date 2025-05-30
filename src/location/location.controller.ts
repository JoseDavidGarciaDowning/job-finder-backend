import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get(':input')
  getAutocomplete(@Param('input') input: string) {
    return this.locationService.autocomplete(input);
  }
  @Get('details/:placeId')
  getDetails(@Param('placeId') placeId: string) {
    return this.locationService.getPlaceDetails(placeId);
  }

  @Get('countries/:input')
  getAutocompleteCountry(@Param('input') input: string) {
    return this.locationService.autoCompleteCountry(input);
  }
  @Get('countrycode/:input')
  getCountryCode(@Param('input') input: string) {
    return this.locationService.getCountryCode(input);
  }

  @Get('autocomplete/:countryCode/:input')
  getAutocompleteFromCountry(
    @Param('countryCode') countryCode: string,
    @Param('input') input: string,
  ) {
    return this.locationService.autocompleteFromCountry(countryCode, input);
  }

  @Post()
  saveLocationData(
    @CurrentUser() user: any,
    @Body() createLocationDto: CreateLocationDto,
  ) {
    return this.locationService.saveLocationData(createLocationDto, user);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
