import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { IngATMsModule } from './modules/ing-atms/ing-atms.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3000,
      dialect: process.env.DB_DIALECT as Dialect || 'postgres',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    IngATMsModule
  ]
})
export class AppModule { }
