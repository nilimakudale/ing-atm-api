import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, Logger, LoggerService, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JWTKEY } from '../../common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(Logger) private logger: LoggerService,
        private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWTKEY || JWTKEY,
        });
    }

    async validate(payload: any) {
        this.logger.log(`In JwtStrategy validate()...payload=${payload}`);
        try {
            // check if user in the token actually exist
            const user = await this.userService.findOneById(payload.id);
            if (!user) {
                this.logger.error(`User is not valid, user id=${payload.id}`);
                throw new UnauthorizedException('You are not authorized to perform the operation');
            }
            return payload;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
