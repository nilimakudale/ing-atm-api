import { Test, TestingModule } from '@nestjs/testing';

import { IngATMsController } from './ing-atms.controller';
import { IngATMsService } from './ing-atms.service';
import { IngATMDto } from './dto/ing-atm.dto';
import { Logger } from '@nestjs/common';

describe('IngATMs Controller', () => {
  let ingATMsController: IngATMsController;
  let spyService: IngATMsService;
  beforeAll(async () => {
    
    const apiServiceProvider = {
      provide: IngATMsService,
      useFactory: () => ({
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        update: jest.fn(() => { }),
        delete: jest.fn(() => { })
      })
    }
    const loggerServiceProvider = {
      provide: Logger,
      useFactory: () => ({
        log: jest.fn(() => { }),
        error: jest.fn(() => { }),
      })
    }

    const app: TestingModule = await Test.createTestingModule({
      controllers: [IngATMsController],
      providers: [IngATMsService, apiServiceProvider, loggerServiceProvider],
    }).compile();

    ingATMsController = app.get<IngATMsController>(IngATMsController);
    spyService = app.get<IngATMsService>(IngATMsService);
  })

  it("calling create method", () => {
    const dto = new IngATMDto();
    expect(ingATMsController.create(dto)).not.toEqual(null);
  })

  it("calling findAll method", () => {
    ingATMsController.findAll();
    expect(spyService.findAll).toHaveBeenCalled();
  })

  it("calling update method", () => {
    const dto = new IngATMDto();
    expect(ingATMsController.update(1,dto)).not.toEqual(null);
    expect(spyService.update).toHaveBeenCalled();
    expect(spyService.update).toHaveBeenCalledWith(1,dto);
  })

  it("calling delete method", () => {
    ingATMsController.remove(1);
    expect(spyService.delete).toHaveBeenCalledWith(1);
  })

  it('should be defined', () => {
    expect(ingATMsController).toBeDefined();
  });
});
