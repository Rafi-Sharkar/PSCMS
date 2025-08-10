import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BusinessModule } from './business/business.module';
import { OrdersModule } from './orders/orders.module';
import { CollectionModule } from './collection/collection.module';
import { PrismaService } from './prisma/prisma.service';
import { FarmStockModule } from './farm_stock/farm_stock.module';
import { OwnerOrderModule } from './owner_order/owner_order.module';
import { DashboardModule } from './dashboard/dashboard.module';


@Module({
  imports: [AuthModule, UsersModule, BusinessModule, OrdersModule, CollectionModule, FarmStockModule, OwnerOrderModule, DashboardModule],
  providers: [PrismaService],
})
export class AppModule {}
