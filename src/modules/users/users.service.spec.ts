import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

import { UsersService } from './users.service';

class ApiServiceMock {
  create(user: UserDto) {
     return {};
  }
  findOneByEmail(email: string) {
    return {
      id:1,
      name: "test",
      email:"test@gmail.com",
      password : "test"
    };
  }
  findOneById(id: number) {
    return {};
  }

  getUser(_firstName: string, _lastName: string) {
    return {
      name: 'Jane Doe',
    };
  }

}

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService, ApiServiceProvider
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  })

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       UsersService,{
  //       provide: UsersService,
  //       useValue: {},
  //       }
  //     ],
  //   }).compile();

  //   service = module.get<UsersService>(UsersService);
  // });



  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user by email',async () => {
    const result = {
      id:1,
      name: "test",
      email:"test@gmail.com",
      password : "test"
    };
    const data = await service.findOneByEmail('test@gmail.com');
    expect(data).toEqual(result);
  });

});
