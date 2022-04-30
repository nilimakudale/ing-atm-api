import { IngATM } from './ing-atm.entity';
import { ING_ATM_REPOSITORY } from '../../core/constants';

export const angATMsProviders = [
    {
        provide: ING_ATM_REPOSITORY,
        useValue: IngATM,
    },
];
