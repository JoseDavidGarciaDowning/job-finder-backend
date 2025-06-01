import { Test, TestingModule } from '@nestjs/testing';
import { JobCharacteristicsController } from './job-characteristics.controller';
import { JobCharacteristicsService } from './job-characteristics.service';
import { CreateJobCharacteristicDto } from './dto/create-job-characteristic.dto';
import { UpdateJobCharacteristicDto } from './dto/update-job-characteristic.dto';

describe('JobCharacteristicsController', () => {
  let controller: JobCharacteristicsController;
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
      controllers: [JobCharacteristicsController],
      providers: [{ provide: JobCharacteristicsService, useValue: service }],
    }).compile();

    controller = module.get<JobCharacteristicsController>(JobCharacteristicsController);
  });

  it('crea una característica del trabajo', async () => {
    const dto: CreateJobCharacteristicDto = { name: 'Proactivo', description: 'Se anticipa a los problemas' };
    const mockResult = { id: '1', ...dto };
    service.create.mockResolvedValue(mockResult);

    const result = await controller.create(dto);
    expect(result).toEqual(mockResult);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('devuelve todas las características del trabajo', async () => {
    const mockData = [{ id: '1', name: 'Puntual', description: 'Siempre llega a tiempo' }];
    service.findAll.mockResolvedValue(mockData);

    const result = await controller.findAll();
    expect(result).toEqual(mockData);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('devuelve una característica por ID', async () => {
    const id = '123';
    const mockResult = { id, name: 'Liderazgo', description: 'Guía al equipo' };
    service.findOne.mockResolvedValue(mockResult);

    const result = await controller.findOne(id);
    expect(result).toEqual(mockResult);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('actualiza una característica existente', async () => {
    const id = '123';
    const dto: UpdateJobCharacteristicDto = { name: 'Responsable', description: 'Cumple sus tareas' };
    const mockResult = { id, ...dto };
    service.update.mockResolvedValue(mockResult);

    const result = await controller.update(id, dto);
    expect(result).toEqual(mockResult);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('elimina una característica por ID', async () => {
    const id = '123';
    const mockResult = { id };
    service.remove.mockResolvedValue(mockResult);

    const result = await controller.remove(id);
    expect(result).toEqual(mockResult);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
