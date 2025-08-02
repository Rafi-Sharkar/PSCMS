import { Module } from '@nestjs/common';
import { FarmstocksService } from './farmstocks.service';
import { FarmstocksController } from './farmstocks.controller';

@Module({
  controllers: [FarmstocksController],
  providers: [FarmstocksService],
})
export class FarmstocksModule {}
