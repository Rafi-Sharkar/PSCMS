import { Module } from '@nestjs/common';
import { FarmStockBusinessService } from './farm_stock_business.service';
import { FarmStockBusinessController } from './farm_stock_business.controller';

@Module({
  controllers: [FarmStockBusinessController],
  providers: [FarmStockBusinessService],
})
export class FarmStockBusinessModule {}
