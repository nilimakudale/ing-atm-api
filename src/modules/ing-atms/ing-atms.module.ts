import { Module, Logger } from '@nestjs/common';
import { IngATMsService } from './ing-atms.service';
import { IngATMsController } from './ing-atms.controller';
import { IngATM } from './ing-atm.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([IngATM])],
  providers: [IngATMsService, Logger],
  controllers: [IngATMsController],
})
export class IngATMsModule {}
