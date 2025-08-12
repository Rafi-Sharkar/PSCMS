import { Module } from '@nestjs/common';
import { OwnerOrderService } from './owner_order.service';
import { OwnerOrderController } from './owner_order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OwnerOrderController],
  providers: [OwnerOrderService, PrismaService, JwtService],
})
export class OwnerOrderModule {}
