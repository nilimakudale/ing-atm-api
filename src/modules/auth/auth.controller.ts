import { Controller, Body, Post, ForbiddenException, LoggerService, Logger, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { UserLoginDto } from '../users/dto/user-login.dto';
import { UsersService } from '../users/users.service';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth APIs')

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(Logger) private logger: LoggerService,
        private authService: AuthService,
        private userService: UsersService) { }

    @Post('login')
    @ApiOkResponse({ description: 'Login successful' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error ' })
    async login(@Body() loginReq: UserLoginDto) {
        this.logger.log(`AuthController Login(): username:${loginReq.username}, password:${loginReq.password}`);
        try {
            return await this.authService.login(loginReq);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    @Post('signup')
    @ApiOkResponse({ description: 'Sing Up successful' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error ' })
    async signUp(@Body() user: CreateUserDto) {
        this.logger.log(`AuthController signup(): user: ${JSON.stringify(user)}`);
        try {
            const userExist = await this.userService.findOneByEmail(user.email);
            if (userExist) {
                throw new ForbiddenException('This email already exist');
            } else {
                return await this.authService.create(user);
            }
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
