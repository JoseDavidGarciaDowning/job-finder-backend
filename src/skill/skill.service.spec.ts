import { Test, TestingModule } from '@nestjs/testing';
import { SkillService } from './skill.service';
import { SkillRepository } from './repository/skill.repository';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('SkillService', () => {
  let service: SkillService;
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
        SkillService,
        { provide: SkillRepository, useValue: repo },
      ],
    }).compile();

    service = module.get<SkillService>(SkillService);
  });

  it('lanza error si ya existe la habilidad', async () => {
    repo.findByName.mockResolvedValue([{}]);
    await expect(
      service.create({ name: 'Comunicación' })
    ).rejects.toThrow(InternalServerErrorException);
  });

  it('crea una habilidad si no existe previamente', async () => {
    repo.findByName.mockResolvedValue([]);
    repo.create.mockResolvedValue([{ id: '1', name: 'Resolución de conflictos' }]);

    const result = await service.create({ name: 'Resolución de conflictos' });
    expect(result).toEqual({ id: '1', name: 'Resolución de conflictos' });
  });

  it('retorna todas las habilidades', async () => {
    const mockData = [{ id: '1', name: 'Liderazgo' }];
    repo.findAll.mockResolvedValue(mockData);

    const result = await service.findAll();
    expect(result).toEqual(mockData);
  });

  it('lanza error si no encuentra la habilidad por id', async () => {
    repo.findById.mockResolvedValue([]);
    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('devuelve una habilidad si existe', async () => {
    const data = [{ id: '1', name: 'Trabajo en equipo' }];
    repo.findById.mockResolvedValue(data);

    const result = await service.findOne('1');
    expect(result).toEqual(data[0]);
  });

  it('lanza error si no se actualiza ninguna habilidad', async () => {
    repo.update.mockResolvedValue([]);
    await expect(
      service.update('1', { name: 'Nueva habilidad' })
    ).rejects.toThrow(InternalServerErrorException);
  });

  it('actualiza una habilidad correctamente', async () => {
    const updated = [{ id: '1', name: 'Creatividad' }];
    repo.update.mockResolvedValue(updated);

    const result = await service.update('1', { name: 'Creatividad' });
    expect(result).toEqual(updated[0]);
  });

  it('lanza error si no se elimina la habilidad', async () => {
    repo.remove.mockResolvedValue([]);
    await expect(service.remove('1')).rejects.toThrow(InternalServerErrorException);
  });

  it('elimina una habilidad correctamente', async () => {
    const deleted = [{ id: '1' }];
    repo.remove.mockResolvedValue(deleted);

    const result = await service.remove('1');
    expect(result).toEqual(deleted[0]);
  });
});
