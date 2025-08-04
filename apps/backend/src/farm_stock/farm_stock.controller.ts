import { Controller } from '@nestjs/common';
import { FarmStockService } from './farm_stock.service';

@Controller('farm-stock')
export class FarmStockController {
  constructor(private readonly farmStockService: FarmStockService) {}
}
