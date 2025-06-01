import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { CompanyRepository } from './repository/company.repository';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('CompanyService', () => {
  let service: CompanyService;
  let repo: Record<string, jest.Mock>;

  beforeEach(async () => {
    repo = {
      findByName: jest.fn(),
      create: jest.fn(),
      findAllWithUser: jest.fn(),
      findOneWithUser: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        { provide: CompanyRepository, useValue: repo },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('lanza error si ya existe la compañía', async () => {
    repo.findByName.mockResolvedValue([{}]);
    await expect(
      service.create({ name: 'EmpresaX', description: '', userId: '1' })
    ).rejects.toThrow(InternalServerErrorException);
  });

  it('crea una compañía si no existe previamente', async () => {
    const dto = { name: 'EmpresaNueva', description: 'Desc', userId: '1' };
    const created = [{ id: '1', ...dto }];
    repo.findByName.mockResolvedValue([]);
    repo.create.mockResolvedValue(created);

    const result = await service.create(dto);
    expect(result).toEqual(created);
  });

  it('retorna todas las compañías con usuarios', async () => {
    const companies = [{ companyId: '1', companyName: 'X', description: '', userEmail: 'a@a.com' }];
    repo.findAllWithUser.mockResolvedValue(companies);

    const result = await service.findAll();
    expect(result).toEqual(companies);
  });

  it('lanza error si no encuentra compañía por id', async () => {
    repo.findOneWithUser.mockResolvedValue([]);
    await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
  });

  it('retorna una compañía si existe', async () => {
    const data = [{ companyId: '1', companyName: 'EmpresaX' }];
    repo.findOneWithUser.mockResolvedValue(data);

    const result = await service.findOne('1');
    expect(result).toEqual(data[0]);
  });

  it('lanza error si no se actualiza ninguna compañía', async () => {
    repo.update.mockResolvedValue([]);
    await expect(
      service.update('1', { name: 'Mod' })
    ).rejects.toThrow(NotFoundException);
  });

  it('actualiza una compañía correctamente', async () => {
    const updated = [{ id: '1', name: 'EmpresaActualizada' }];
    repo.update.mockResolvedValue(updated);

    const result = await service.update('1', { name: 'EmpresaActualizada' });
    expect(result).toEqual(updated[0]);
  });

  it('lanza error si no se elimina ninguna compañía', async () => {
    repo.remove.mockResolvedValue([]);
    await expect(service.remove('1')).rejects.toThrow(NotFoundException);
  });

  it('elimina una compañía correctamente', async () => {
    const deleted = [{ id: '1' }];
    repo.remove.mockResolvedValue(deleted);

    const result = await service.remove('1');
    expect(result).toEqual(deleted[0]);
  });
});
