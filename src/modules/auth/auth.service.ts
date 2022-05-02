import { Inject, Injectable, Logger, LoggerService, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { UserLoginDto } from '../users/dto/user-login.dto';
import { CreateUserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(Logger) private logger: LoggerService,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string) {
        this.logger.log(`AuthService : validateUser : username:${username}, password:${pass}`);
        try {
            // find if user exist with this email
            const user = await this.userService.findOneByEmail(username);
            if (!user) {
                return null;
            }
            // find if user password match
            const match = await this.comparePassword(pass, user.password);
            if (!match) {
                return null;
            }
            const { password, ...result } = user['dataValues'];
            return result;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    public async login(loginReq: UserLoginDto) {
        this.logger.log(`AuthService : login : username:${loginReq.username}, password:${loginReq.password}`);
        try {
            const user = await this.validateUser(loginReq.username, loginReq.password);
            if (user && user.id) {
                const token = await this.generateToken({ id: user.id, email: user.email });
                return { user, token };
            } else {
                throw new UnauthorizedException('Invalid user credentials');
            }
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    public async create(user: CreateUserDto) {
        this.logger.log(`AuthService : create : user: ${JSON.stringify(user)}`);
        try {
            // hash the password
            const pass = await this.hashPassword(user.password);
            // create the user
            const newUser = await this.userService.create({ ...user, password: pass });
            const { password, ...result } = newUser['dataValues'];
            // generate token
            const token = await this.generateToken(result);
            // return the user and the token
            return { user: result, token };
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password: string) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}
