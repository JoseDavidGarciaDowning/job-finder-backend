import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: Record<string, jest.Mock>;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [{ provide: CompanyService, useValue: service }],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('crea una nueva compañía', async () => {
    const dto: CreateCompanyDto = { name: 'EmpresaX', description: 'Descripción', userId: '123' };
    const expected = { id: '1', ...dto };
    service.create.mockResolvedValue(expected);

    const result = await controller.create(dto);
    expect(result).toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('retorna todas las compañías', async () => {
    const companies = [
      { companyId: '1', companyName: 'EmpresaA', description: 'A', userEmail: 'a@example.com' },
      { companyId: '2', companyName: 'EmpresaB', description: 'B', userEmail: 'b@example.com' },
    ];
    service.findAll.mockResolvedValue(companies);

    const result = await controller.findAll();
    expect(result).toEqual(companies);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('retorna una compañía por ID', async () => {
    const id = '1';
    const company = { companyId: id, companyName: 'EmpresaX', description: 'X', userEmail: 'x@example.com' };
    service.findOne.mockResolvedValue(company);

    const result = await controller.findOne(id);
    expect(result).toEqual(company);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('actualiza una compañía', async () => {
    const id = '1';
    const dto: UpdateCompanyDto = { name: 'EmpresaMod', description: 'Modificada' };
    const updated = { id, ...dto };
    service.update.mockResolvedValue(updated);

    const result = await controller.update(id, dto);
    expect(result).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('elimina una compañía', async () => {
    const id = '1';
    const deleted = { id };
    service.remove.mockResolvedValue(deleted);

    const result = await controller.remove(id);
    expect(result).toEqual(deleted);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
