import { Test, TestingModule } from '@nestjs/testing';

import { IngATMsService } from './ing-atms.service';
import { IngATMDto } from './dto/ing-atm.dto';
import { IngATM } from './ing-atm.entity';
import { getModelToken } from '@nestjs/sequelize';

const result = {
  "id": 1,
  "name": "test1",
  "street": "street1",
  "city": "pune",
  "geoLocation": {
    "lat": "52.60022",
    "lng": "4.703054"
  }
}

const mockRepository = {
  findOne: jest.fn(email => result),
  findAll: jest.fn(() => {}),
  findOneById: jest.fn((id: number) => result),
  create: jest.fn(() => {}),
  update: jest.fn(() => {}),
  delete : jest.fn(() => {}),
}
describe('IngATMsService', () => {
  let spyService: IngATMsService;
  let repositoryMock;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngATMsService, {
        provide: getModelToken(IngATM),
        useValue: mockRepository}],
    }).compile();

    spyService = module.get<IngATMsService>(IngATMsService);
    repositoryMock = module.get<typeof IngATM>(getModelToken(IngATM));
  })

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const createSpy = jest.spyOn(spyService, 'create');
    const dto = new IngATMDto();
    //spyService.create(dto);
    expect(spyService.create(dto)).not.toEqual(null);
    expect(createSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findAll method', async () => {
    const findOneSpy = jest.spyOn(spyService, 'findAll');
    spyService.findAll();
    expect(findOneSpy).toHaveBeenCalled();
  });

  it('should call update method', async () => {
    const updateNoteSpy = jest.spyOn(spyService, 'update');
    const id = 'testId';
    const dto = new IngATMDto();
    const resp = spyService.update(id, dto);
    expect(updateNoteSpy).toHaveBeenCalledWith(id, dto);
    expect(resp).toBeTruthy()
  });

  it('should call delete method with expected param', async () => {
    const deleteSpy = jest.spyOn(spyService, 'delete');
    const deleteId = 'deleteId';
    spyService.delete(deleteId);
    expect(deleteSpy).toHaveBeenCalledWith(deleteId);
  });

  it('should return ATM by id',async () => {
    repositoryMock.findOne.mockReturnValue(result);
    const data = spyService.findOne(result.id);
    expect(repositoryMock.findOne).toHaveBeenCalledWith({"where": {"id":result.id}});
  });


});
