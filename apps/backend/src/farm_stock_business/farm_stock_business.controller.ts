import { Controller } from '@nestjs/common';
import { FarmStockBusinessService } from './farm_stock_business.service';

@Controller('farm-stock-business')
export class FarmStockBusinessController {
  constructor(private readonly farmStockBusinessService: FarmStockBusinessService) {}
}
