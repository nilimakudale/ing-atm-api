import { Injectable, Inject } from '@nestjs/common';

import { IngATM } from './ing-atm.entity';
import { IngATMDto } from './dto/ing-atm.dto';
import { ING_ATM_REPOSITORY } from '../../core/constants';

@Injectable()
export class IngATMsService {
    constructor(@Inject(ING_ATM_REPOSITORY) private readonly angAtmRepository: typeof IngATM) { }

    async create(ingATM: IngATMDto): Promise<IngATM> {
        return await this.angAtmRepository.create<IngATM>({ ...ingATM });
    }

    async findAll(): Promise<IngATM[]> {
        return await this.angAtmRepository.findAll<IngATM>();
    }

    async findOne(id): Promise<IngATM> {
        return await this.angAtmRepository.findOne({
            where: { id }});
    }

    async delete(id) {
        return await this.angAtmRepository.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedATM]] = await this.angAtmRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedATM };
    }
}
