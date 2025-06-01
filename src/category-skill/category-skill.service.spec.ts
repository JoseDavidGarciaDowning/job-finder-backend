import { Test, TestingModule } from '@nestjs/testing';
import { CategorySkillService } from './category-skill.service';
import { CategorySkillRepository } from './repository/category-skill.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('CategorySkillService', () => {
  let service: CategorySkillService;
  let repo: Record<string, jest.Mock>;

  beforeEach(async () => {
    repo = {
      findDuplicate: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategorySkillService,
        { provide: CategorySkillRepository, useValue: repo },
      ],
    }).compile();

    service = module.get<CategorySkillService>(CategorySkillService);
  });

  it('retorna error 500 si ya existe la relación', async () => {
    repo.findDuplicate.mockResolvedValue([{}]);
    await expect(service.create({ categoryId: '1', skillId: '1' })).rejects.toThrow(InternalServerErrorException);
  });

  it('crea la relación si no hay duplicado', async () => {
    repo.findDuplicate.mockResolvedValue([]);
    repo.create.mockResolvedValue([{ id: '123' }]);
    const result = await service.create({ categoryId: '1', skillId: '1' });
    expect(result).toEqual({ id: '123' });
  });

  it('retorna todos los registros correctamente', async () => {
    repo.findAll.mockResolvedValue([{ id: '1' }]);
    const result = await service.findAll();
    expect(result).toEqual([{ id: '1' }]);
  });

  it('retorna error 500 si no se encuentra el id en findOne', async () => {
    repo.findById.mockResolvedValue([]);
    await expect(service.findOne('999')).rejects.toThrow(InternalServerErrorException);
  });

  it('retorna el registro si existe', async () => {
    const item = [{ id: '1' }];
    repo.findById.mockResolvedValue(item);
    const result = await service.findOne('1');
    expect(result).toEqual(item[0]);
  });

  it('retorna error 500 si no encuentra el id al actualizar', async () => {
    repo.update.mockResolvedValue([]);
    await expect(service.update('1', { categoryId: '2', skillId: '3' })).rejects.toThrow(InternalServerErrorException);
  });

  it('retorna el objeto actualizado', async () => {
    const updated = [{ id: '1', categoryId: '2', skillId: '3' }];
    repo.update.mockResolvedValue(updated);
    const result = await service.update('1', { categoryId: '2', skillId: '3' });
    expect(result).toEqual(updated[0]);
  });

  it('retorna error 500 si no encuentra el id al eliminar', async () => {
    repo.remove.mockResolvedValue([]);
    await expect(service.remove('1')).rejects.toThrow(InternalServerErrorException);
  });

  it('retorna el objeto eliminado correctamente', async () => {
    const deleted = [{ id: '1' }];
    repo.remove.mockResolvedValue(deleted);
    const result = await service.remove('1');
    expect(result).toEqual(deleted[0]);
  });
});
