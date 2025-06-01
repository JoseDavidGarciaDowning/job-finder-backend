import { Test, TestingModule } from '@nestjs/testing';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

describe('SkillController', () => {
  let controller: SkillController;
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
      controllers: [SkillController],
      providers: [{ provide: SkillService, useValue: service }],
    }).compile();

    controller = module.get<SkillController>(SkillController);
  });

  it('crea una nueva habilidad', async () => {
    const dto: CreateSkillDto = { name: 'Trabajo en equipo' };
    const mockResult = { id: '1', ...dto };
    service.create.mockResolvedValue(mockResult);

    const result = await controller.create(dto);
    expect(result).toEqual(mockResult);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('retorna todas las habilidades', async () => {
    const mockData = [{ id: '1', name: 'Comunicación' }];
    service.findAll.mockResolvedValue(mockData);

    const result = await controller.findAll();
    expect(result).toEqual(mockData);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('retorna una habilidad por ID', async () => {
    const mockResult = { id: '1', name: 'Creatividad' };
    service.findOne.mockResolvedValue(mockResult);

    const result = await controller.findOne('1');
    expect(result).toEqual(mockResult);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('actualiza una habilidad por ID', async () => {
    const id = '1';
    const dto: UpdateSkillDto = { name: 'Resolución de problemas' };
    const updated = { id, ...dto };
    service.update.mockResolvedValue(updated);

    const result = await controller.update(id, dto);
    expect(result).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('elimina una habilidad por ID', async () => {
    const deleted = { id: '1' };
    service.remove.mockResolvedValue(deleted);

    const result = await controller.remove('1');
    expect(result).toEqual(deleted);
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
