import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  const testUser = {
    email: 'nilima2@gmail.com',
    password: 'n1l1ma2',
    name: 'test'
  };

  const JWTServiceProvider = {
    provide: JwtService,
    useFactory: () => ({
      signAsync: jest.fn(() => { }),
    })
  }

  const usersServiceProvider = {
    provide: UsersService,
    useFactory: () => ({
      findOneByEmail: jest.fn((email) => { 
        if (email === testUser.email) 
        return testUser; 
        else return null; 
      }),
      create: jest.fn(() => { return  {dataValues:testUser}}),
    })
  }

  const loggerServiceProvider = {
    provide: Logger,
    useFactory: () => ({
      log: jest.fn(() => { }),
      error: jest.fn(() => { }),
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        AuthService,
        JWTServiceProvider,
        usersServiceProvider,
        loggerServiceProvider
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should validate user', async () => {
    const data = authService.validateUser(testUser.email, testUser.password);
    expect(userService.findOneByEmail).toHaveBeenCalled();
  });

  it('should validate user test with invalid user', async () => {
    const data = await authService.validateUser('bchdb', testUser.password);
    expect(data).toEqual(null);
  });

  it("should generate token(login)", async() => {
    const data =await authService.login({username:testUser.email, password: testUser.password});
    expect(authService.validateUser(testUser.email,testUser.password)).toBeDefined();
    expect(data).toBeDefined();
  })

  it("create new user and generate token(signup)", async() => {
    const data = await authService.create(testUser);
    expect(data).toBeDefined();
  })

});
