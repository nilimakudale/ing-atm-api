import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  const testUser = {
    email: 'test@gmail.com',
    password: '123',
    name: 'test'
  };

  const ApiServiceProvider = {
    provide: JwtService,
    useFactory: () => ({
      signAsync: jest.fn(() => { }),
    })
  }

  const UsersServiceProvider = {
    provide: UsersService,
    useFactory: () => ({
      findOneByEmail: jest.fn((email) => { 
        if (email === testUser.email) 
        return testUser; 
        else return null; 
      }),
      create: jest.fn(() => { return testUser }),
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        AuthService,
        ApiServiceProvider,
        UsersServiceProvider
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
    const data = authService.validateUser('bchdb', testUser.password);
    expect(userService.findOneByEmail('sbchsabv')).toHaveBeenCalled();
  });

  it("should generate token", () => {
    authService.login({})
    expect(jwtService.signAsync).toHaveBeenCalled();
  })

  it("create new user and generate token", () => {
    authService.create(testUser);
    expect(userService.create).toHaveBeenCalled();
  })

});
