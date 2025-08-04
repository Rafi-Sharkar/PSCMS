import { Module } from '@nestjs/common';
import { OwnerOrderService } from './owner_order.service';
import { OwnerOrderController } from './owner_order.controller';

@Module({
  controllers: [OwnerOrderController],
  providers: [OwnerOrderService],
})
export class OwnerOrderModule {}
