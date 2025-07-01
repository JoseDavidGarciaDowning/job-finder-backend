import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Post()
  @Auth(ValidRoles.company, ValidRoles.admin)
  create(@GetUser() user: User, @Body() dto: CreateCompanyDto) {
    console.log('hola');
    console.log({ body: dto, userId: user.id });
    return this.service.create(dto, user.id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
