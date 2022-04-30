import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('UsersService', () => {
  let spyService: UsersService;
  let repositoryMock: MockType<typeof User>;
  const result = {
    id:1,
    name: "test",
    email:"test@gmail.com",
    password : "test"
  };

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: getRepositoryToken(User),
      useFactory: () => ({
        findOne: jest.fn(email => result),
        findAll: jest.fn(() => []),
        findOneById: jest.fn((id:number) => result),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      providers: [...usersProviders, UsersService, ApiServiceProvider],
    }).compile();

    spyService = app.get<UsersService>(UsersService);
    repositoryMock = app.get(getRepositoryToken(User));
  })

  it('should return user by id',async () => {
    repositoryMock.findOne.mockReturnValue(result);
    const data = await spyService.findOneById(result.id);
    expect(repositoryMock.findOne).toHaveBeenCalledWith(result.id);
    expect(data).toEqual(result);
  });

  it('should return user by email',async () => {
    repositoryMock.findOne.mockReturnValue(result);
    const data = await spyService.findOneByEmail(result.email);
    expect(repositoryMock.findOne).toHaveBeenCalledWith(result.email);
    expect(data).toEqual(result);
  });

  it('should create user',async () => {
    repositoryMock.findOne.mockReturnValue(result);
    const data = await spyService.create(result);
    expect(repositoryMock.create).toHaveBeenCalledWith(result);
  });

});
