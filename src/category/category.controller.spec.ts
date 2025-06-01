import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const mockCategoryService = {
  create: jest.fn(dto => ({ id: '1', ...dto })),
  findAll: jest.fn(() => [{ id: '1', name: 'Tech' }]),
  findOne: jest.fn(id => ({ id, name: 'Tech' })),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  remove: jest.fn(id => ({ id, deleted: true })),
};

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const dto: CreateCategoryDto = { name: 'Tech' };
    const result = await controller.create(dto);
    expect(result).toEqual({ id: '1', name: 'Tech' });
    expect(mockCategoryService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all categories', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: '1', name: 'Tech' }]);
    expect(mockCategoryService.findAll).toHaveBeenCalled();
  });

  it('should return one category by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({ id: '1', name: 'Tech' });
    expect(mockCategoryService.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a category', async () => {
    const dto: UpdateCategoryDto = { name: 'Updated' };
    const result = await controller.update('1', dto);
    expect(result).toEqual({ id: '1', name: 'Updated' });
    expect(mockCategoryService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should delete a category', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ id: '1', deleted: true });
    expect(mockCategoryService.remove).toHaveBeenCalledWith('1');
  });
});
