import { Controller } from '@nestjs/common';
import { FarmstocksService } from './farmstocks.service';

@Controller('farmstocks')
export class FarmstocksController {
  constructor(private readonly farmstocksService: FarmstocksService) {}
}
