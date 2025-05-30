import { Injectable } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { AppplicantRepositoryService } from './repository/appplicant.repository.service';

@Injectable()
export class ApplicantService {
  constructor(
    private readonly applicantRepositoryService: AppplicantRepositoryService, // Assuming you have a repository
  ) {}

  create(createApplicantDto: CreateApplicantDto, userId: string) {
    return this.applicantRepositoryService.createBaseApplicantProfile(createApplicantDto, userId);
  }

  findAll() {
    return `This action returns all applicant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applicant`;
  }

  update(id: number, updateApplicantDto: UpdateApplicantDto) {
    return `This action updates a #${id} applicant`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicant`;
  }
}
