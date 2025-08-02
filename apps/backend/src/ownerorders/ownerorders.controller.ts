import { Controller } from '@nestjs/common';
import { OwnerordersService } from './ownerorders.service';

@Controller('ownerorders')
export class OwnerordersController {
  constructor(private readonly ownerordersService: OwnerordersService) {}
}
