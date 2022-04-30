import { Test, TestingModule } from '@nestjs/testing';

import { IngATMsService } from './ing-atms.service';
import { IngATMDto } from './dto/ing-atm.dto';

class ApiServiceMock {
  create(dto: any) {
     return [];
  }
  findAll() {
    return [];
  }
  delete(id: string) {
    return null;
  }
  update(id: string, dto: any) {
    return [];
  }
}

describe('IngATMsService', () => {
  let ingATMsService: IngATMsService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: IngATMsService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngATMsService, ApiServiceProvider
      ],
    }).compile();
    ingATMsService = module.get<IngATMsService>(IngATMsService);
  })

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       IngATMsService,{
  //       provide: IngATMsService,
  //       useValue: {},
  //       }
  //     ],
  //   }).compile();

  //   service = module.get<IngATMsService>(IngATMsService);
  // });

  it('should be defined', () => {
    expect(ingATMsService).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const createSpy = jest.spyOn(ingATMsService, 'create');
    const dto = new IngATMDto();
    //ingATMsService.create(dto);
    expect(ingATMsService.create(dto)).not.toEqual(null);
    expect(createSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findAll method', async () => {
    const findOneSpy = jest.spyOn(ingATMsService, 'findAll');
    ingATMsService.findAll();
    expect(findOneSpy).toHaveBeenCalled();
  });

  it('should call update method', async () => {
    const updateNoteSpy = jest.spyOn(ingATMsService, 'update');
    const id = 'testId';
    const dto = new IngATMDto();
    ingATMsService.update(id, dto);
    expect(updateNoteSpy).toHaveBeenCalledWith(id, dto);
  });

  it('should call delete method with expected param', async () => {
    const deleteSpy = jest.spyOn(ingATMsService, 'delete');
    const deleteId = 'deleteId';
    ingATMsService.delete(deleteId);
    expect(deleteSpy).toHaveBeenCalledWith(deleteId);
  });

});
