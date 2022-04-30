import { Module } from '@nestjs/common';

import { IngATMsService } from './ing-atms.service';
import { IngATMsController } from './ing-atms.controller';
import { angATMsProviders } from './ing-atms.providers';

@Module({
  providers: [IngATMsService, ...angATMsProviders],
  controllers: [IngATMsController],
})
export class IngATMsModule {}
