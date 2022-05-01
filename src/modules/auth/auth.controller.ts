import { Controller, Body, Post, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { UserLoginDto } from '../users/dto/user-login.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private readonly userService: UsersService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() loginReq: UserLoginDto) {
        return await this.authService.login(loginReq);
    }

    @Post('signup')
    async signUp(@Body() user: UserDto) {
        const userExist = await this.userService.findOneByEmail(user.email);
        if (userExist) {
            throw new ForbiddenException('This email already exist');
        }else{
            return await this.authService.create(user);
        }
    }
}
