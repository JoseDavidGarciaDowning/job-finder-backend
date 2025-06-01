import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repository/category.repository';
import { InternalServerErrorException, BadRequestException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let repo: CategoryRepository;

  const mockRepo = {
    findByName: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    deleteCategorySkills: jest.fn(),
    deleteCategory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repo = module.get<CategoryRepository>(CategoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a category if name does not exist', async () => {
      const dto = { name: 'Tech' };
      const created = [{ id: '1', name: 'Tech' }];

      mockRepo.findByName.mockResolvedValue([]);
      mockRepo.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(result).toEqual(created[0]);
      expect(mockRepo.findByName).toHaveBeenCalledWith('Tech');
    });

    it('should throw InternalServerErrorException if category already exists', async () => {
      mockRepo.findByName.mockResolvedValue([{ id: '1', name: 'Tech' }]);

      await expect(service.create({ name: 'Tech' })).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      mockRepo.findByName.mockRejectedValue(new Error('DB error'));

      await expect(service.create({ name: 'Test' })).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll()', () => {
    it('should return all categories', async () => {
      const data = [{ id: '1', name: 'Tech' }];
      mockRepo.findAll.mockResolvedValue(data);
      expect(await service.findAll()).toEqual(data);
    });
  });

  describe('findOne()', () => {
    it('should return category by id', async () => {
      const data = [{ id: '1', name: 'Tech' }];
      mockRepo.findById.mockResolvedValue(data);
      expect(await service.findOne('1')).toEqual(data[0]);
    });

    it('should throw InternalServerErrorException if not found', async () => {
      mockRepo.findById.mockResolvedValue([]);
      await expect(service.findOne('999')).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('update()', () => {
    it('should return updated category', async () => {
      const updated = [{ id: '1', name: 'Updated' }];
      mockRepo.update.mockResolvedValue(updated);
      const result = await service.update('1', { name: 'Updated' });
      expect(result).toEqual(updated[0]);
    });

    it('should throw InternalServerErrorException if update returns empty', async () => {
      mockRepo.update.mockResolvedValue([]);
      await expect(service.update('123', { name: 'X' })).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on DB duplicate error', async () => {
      const error = { code: '23505', message: 'duplicate key' };
      mockRepo.update.mockRejectedValue(error);
      await expect(service.update('1', { name: 'X' })).rejects.toThrow(BadRequestException);

    });
  });

  describe('remove()', () => {
    it('should delete category and related skills', async () => {
      const deleted = [{ id: '1', name: 'Deleted' }];
      mockRepo.deleteCategorySkills.mockResolvedValue(undefined);
      mockRepo.deleteCategory.mockResolvedValue(deleted);

      const result = await service.remove('1');
      expect(result).toEqual(deleted[0]);
    });

    it('should throw InternalServerErrorException if nothing is deleted', async () => {
      mockRepo.deleteCategorySkills.mockResolvedValue(undefined);
      mockRepo.deleteCategory.mockResolvedValue([]);

      await expect(service.remove('999')).rejects.toThrow(InternalServerErrorException);
    });
  });
});
