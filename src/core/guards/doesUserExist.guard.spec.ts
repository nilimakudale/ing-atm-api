import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../modules/users/users.service';
import { DoesUserExist } from './doesUserExist.guard';

describe('DoesUserExist', () => {
  let spyService: UsersService;
  let service: DoesUserExist;

  const testUser = {
    email:'test@gmail.com',
    password:'123',
    name:'test'
  };

  const UsersServiceProvider = {
    provide: UsersService,
    useFactory: () => ({
      findOneByEmail: jest.fn(() => { }),
      create: jest.fn(() => { }),
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersServiceProvider,
        DoesUserExist
      ],
    }).compile();

    spyService = module.get<UsersService>(UsersService);
    service = module.get<DoesUserExist>(DoesUserExist);

  });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('should validate request', async () => {
    const data = service.validateRequest({body:testUser});
    expect(spyService.findOneByEmail).toHaveBeenCalled();
  });

});
