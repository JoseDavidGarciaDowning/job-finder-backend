import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { ValidRoles } from '../auth/interfaces';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.applicant)
  create(@Body() createJobApplicationDto: CreateJobApplicationDto, @GetUser() user: User) {
    return this.jobApplicationService.create(createJobApplicationDto, user.id);
  }

  @Get()
  findAll() {
    return this.jobApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobApplicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.jobApplicationService.update(+id, updateJobApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobApplicationService.remove(+id);
  }
}
