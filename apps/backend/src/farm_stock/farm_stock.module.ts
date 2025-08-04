import { Module } from '@nestjs/common';
import { FarmStockService } from './farm_stock.service';
import { FarmStockController } from './farm_stock.controller';

@Module({
  controllers: [FarmStockController],
  providers: [FarmStockService],
})
export class FarmStockModule {}
