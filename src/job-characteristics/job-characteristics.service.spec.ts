import { Test, TestingModule } from '@nestjs/testing';
import { JobCharacteristicsService } from './job-characteristics.service';
import { JobCharacteristicsRepository } from './repository/job-characteristics.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('JobCharacteristicsService', () => {
  let service: JobCharacteristicsService;
  let repo: Record<string, jest.Mock>;

  beforeEach(async () => {
    repo = {
      findByName: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobCharacteristicsService,
        { provide: JobCharacteristicsRepository, useValue: repo },
      ],
    }).compile();

    service = module.get<JobCharacteristicsService>(JobCharacteristicsService);
  });

 it('lanza error si ya existe la característica', async () => {
  repo.findByName.mockResolvedValue([{}]); 
  await expect(
    service.create({ name: 'Responsable', description: 'Muy responsable' })
  ).rejects.toThrow(InternalServerErrorException);
});

 it('crea una característica si no existe previamente', async () => {
  repo.findByName.mockResolvedValue([]);
  repo.create.mockResolvedValue([{ id: '1', name: 'Puntual', description: 'Se presenta a tiempo' }]);
  
  const result = await service.create({ name: 'Puntual', description: 'Se presenta a tiempo' });
  expect(result).toEqual({ id: '1', name: 'Puntual', description: 'Se presenta a tiempo' });
});


  it('devuelve todas las características', async () => {
    repo.findAll.mockResolvedValue([{ id: '1', name: 'Liderazgo' }]);
    expect(await service.findAll()).toEqual([{ id: '1', name: 'Liderazgo' }]);
  });

  it('lanza error si no encuentra la característica por id', async () => {
    repo.findById.mockResolvedValue([]);
    await expect(service.findOne('999')).rejects.toThrow(InternalServerErrorException);
  });

  it('devuelve una característica por id', async () => {
    const data = [{ id: '1', name: 'Creativo' }];
    repo.findById.mockResolvedValue(data);
    expect(await service.findOne('1')).toEqual(data[0]);
  });

  it('lanza error si no actualiza ninguna fila', async () => {
    repo.update.mockResolvedValue([]);
    await expect(service.update('1', { name: 'Nuevo' })).rejects.toThrow(InternalServerErrorException);
  });

  it('devuelve la característica actualizada', async () => {
    const updated = [{ id: '1', name: 'Actualizado' }];
    repo.update.mockResolvedValue(updated);
    expect(await service.update('1', { name: 'Actualizado' })).toEqual(updated[0]);
  });

  it('lanza error si no elimina ninguna fila', async () => {
    repo.remove.mockResolvedValue([]);
    await expect(service.remove('1')).rejects.toThrow(InternalServerErrorException);
  });

  it('devuelve la característica eliminada', async () => {
    const deleted = [{ id: '1' }];
    repo.remove.mockResolvedValue(deleted);
    expect(await service.remove('1')).toEqual(deleted[0]);
  });
});
