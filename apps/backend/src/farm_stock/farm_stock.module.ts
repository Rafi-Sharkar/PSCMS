import { Module } from '@nestjs/common';
import { FarmStockService } from './farm_stock.service';
import { FarmStockController } from './farm_stock.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [FarmStockController],
  providers: [FarmStockService, PrismaService, JwtService],
})
export class FarmStockModule {}
