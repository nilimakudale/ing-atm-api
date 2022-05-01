import { Injectable, Inject } from '@nestjs/common';
import { IngATM } from './ing-atm.entity';
import { IngATMDto } from './dto/ing-atm.dto';
import { Repository } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IngATMsService {
    constructor(@InjectModel(IngATM) private readonly angAtmRepository: Repository<IngATM>) { }

    async create(ingATM: IngATMDto): Promise<IngATM> {
        return await this.angAtmRepository.create<IngATM>(ingATM);
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
