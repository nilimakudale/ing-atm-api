import { Module, Logger } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JWTKEY, TOKEN_EXPIRATION } from '../../common/constants';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWTKEY || JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION || TOKEN_EXPIRATION },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    Logger
  ],
  controllers: [AuthController],
})
export class AuthModule {}
