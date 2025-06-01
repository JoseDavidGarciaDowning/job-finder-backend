import { Test, TestingModule } from '@nestjs/testing';
import { CategorySkillController } from './category-skill.controller';
import { CategorySkillService } from './category-skill.service';
import { CreateCategorySkillDto } from './dto/create-category-skill.dto';
import { UpdateCategorySkillDto } from './dto/update-category-skill.dto';

describe('CategorySkillController', () => {
  let controller: CategorySkillController;
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
      controllers: [CategorySkillController],
      providers: [{ provide: CategorySkillService, useValue: service }],
    }).compile();

    controller = module.get<CategorySkillController>(CategorySkillController);
  });

  it('crea una nueva relación categoría-habilidad correctamente', async () => {
    const dto: CreateCategorySkillDto = { categoryId: '1', skillId: '2' };
    const mockResult = { id: '123' };
    service.create.mockResolvedValue(mockResult);

    const result = await controller.create(dto);
    expect(result).toEqual(mockResult);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('retorna la lista completa de relaciones', async () => {
    const mockData = [{ id: '1' }];
    service.findAll.mockResolvedValue(mockData);

    const result = await controller.findAll();
    expect(result).toEqual(mockData);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('retorna una relación específica según su identificador', async () => {
    const id = '123';
    const mockResult = { id };
    service.findOne.mockResolvedValue(mockResult);

    const result = await controller.findOne(id);
    expect(result).toEqual(mockResult);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('actualiza una relación existente y retorna el resultado', async () => {
    const id = '123';
    const dto: UpdateCategorySkillDto = { categoryId: '2', skillId: '3' };
    const mockResult = { id, ...dto };
    service.update.mockResolvedValue(mockResult);

    const result = await controller.update(id, dto);
    expect(result).toEqual(mockResult);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('elimina una relación existente correctamente', async () => {
    const id = '123';
    const mockResult = { id };
    service.remove.mockResolvedValue(mockResult);

    const result = await controller.remove(id);
    expect(result).toEqual(mockResult);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
