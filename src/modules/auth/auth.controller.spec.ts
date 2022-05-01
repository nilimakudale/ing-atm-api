import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;
  let spyService: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        login: jest.fn(() => {}),
        create: jest.fn(() => {}),
        signUp: jest.fn(() => {}),
      })
    }

    const UsersServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        findOneByEmail: jest.fn(() => {}),
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        ApiServiceProvider,
        UsersServiceProvider
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
    userService =  module.get<UsersService>(UsersService);
  });

  it("calling login method", () => {
    let loginReq = {username:'',password:''};
    expect(controller.login(loginReq)).not.toEqual(null);
    expect(spyService.login).toHaveBeenCalled();
  })

  it("calling signup method", () => {
    let loginReq = {email:'',password:'',name:''};
    expect(controller.signUp(loginReq)).not.toEqual(null);
    expect(userService.findOneByEmail).toHaveBeenCalled();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
