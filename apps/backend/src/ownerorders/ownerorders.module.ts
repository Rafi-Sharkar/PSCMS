import { Module } from '@nestjs/common';
import { OwnerordersService } from './ownerorders.service';
import { OwnerordersController } from './ownerorders.controller';

@Module({
  controllers: [OwnerordersController],
  providers: [OwnerordersService],
})
export class OwnerordersModule {}
