import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, getConnectionToken } from '@nestjs/sequelize';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('UsersService', () => {
  let spyService: UsersService;
  let repositoryMock;
  const result = {
    id: 1,
    name: "test",
    email: "test@gmail.com",
    password: "test"
  };

  const mockUserRepository = {
    findOneById: jest.fn((id: number) => result),
    findOneByEmail: jest.fn(() => result),
    create: jest.fn(() => { }),
    findOne: jest.fn(() => result),
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getModelToken(User),
        useValue: mockUserRepository,
      }],
    }).compile();

    spyService = module.get<UsersService>(UsersService);
    repositoryMock = module.get<typeof User>(getModelToken(User));
  })

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('should return user by id', async () => {
    const data = spyService.findOneById(result.id);
    expect(repositoryMock.findOne).toHaveBeenCalled();
  });

  it('should return user by email', async () => {
    const data = spyService.findOneByEmail(result.email);
    expect(repositoryMock.findOne).toHaveBeenCalled();
  });

  it('should create user', async () => {
    const data = spyService.create(result);
    expect(repositoryMock.create).toHaveBeenCalledWith(result);
  });

});
