import { Controller } from '@nestjs/common';
import { OwnerOrderService } from './owner_order.service';

@Controller('owner-order')
export class OwnerOrderController {
  constructor(private readonly ownerOrderService: OwnerOrderService) {}
}
