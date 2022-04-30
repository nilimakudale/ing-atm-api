import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { User } from '../../modules/users/user.entity';
import { IngATM } from '../../modules/ing-atms/ing-atm.entity';
import { Dialect } from 'sequelize/types';
dotenv.config();

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config: SequelizeOptions = {
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT) || 3000,
                dialect: process.env.DB_DIALECT as Dialect || 'postgres',
            };

            const sequelize = new Sequelize(config);
            sequelize.addModels([User, IngATM]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
