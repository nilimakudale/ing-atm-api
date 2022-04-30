import { Test, TestingModule } from '@nestjs/testing';

import { IngATMsService } from './ing-atms.service';
import { IngATMDto } from './dto/ing-atm.dto';
import { IngATM } from './ing-atm.entity';
import { MockType } from '../users/users.service.spec';
import { getRepositoryToken } from '@nestjs/typeorm';
import { angATMsProviders } from './ing-atms.providers';

const result =  {
  "id": 1,
  "name": "test1",
  "street": "street1",
  "city": "pune",
  "geoLocation": {
      "lat": "52.60022",
      "lng": "4.703054"
  }
}

describe('IngATMsService', () => {
 // let spyService: IngATMsService;
  let spyService: IngATMsService;
  let repositoryMock: MockType<typeof IngATM>;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: getRepositoryToken(IngATM),
      useFactory: () => ({
        findOne: jest.fn(email => result),
        findAll: jest.fn(() => []),
        findOneById: jest.fn((id:number) => result),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      providers: [...angATMsProviders, IngATMsService, ApiServiceProvider],
    }).compile();

    spyService = app.get<IngATMsService>(IngATMsService);
    repositoryMock = app.get(getRepositoryToken(IngATM));
  })

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const createSpy = jest.spyOn(spyService, 'create');
    const dto = new IngATMDto();
    //spyService.create(dto);
    expect(await spyService.create(dto)).not.toEqual(null);
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
    const resp = await spyService.update(id, dto);
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
    const data = await spyService.findOne(result.id);
    expect(repositoryMock.findOne).toHaveBeenCalledWith(result.id);
  });


});
