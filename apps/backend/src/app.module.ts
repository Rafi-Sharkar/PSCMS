import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BusinessModule } from './business/business.module';
import { OrdersModule } from './orders/orders.module';
import { CollectionModule } from './collection/collection.module';
import { PrismaService } from './prisma/prisma.service';
import { UserBusinessModule } from './user_business/user_business.module';
import { FarmStockModule } from './farm_stock/farm_stock.module';
import { FarmStockBusinessModule } from './farm_stock_business/farm_stock_business.module';
import { OwnerOrderModule } from './owner_order/owner_order.module';
import { DashboardModule } from './dashboard/dashboard.module';


@Module({
  imports: [AuthModule, UsersModule, BusinessModule, OrdersModule, CollectionModule, UserBusinessModule, FarmStockModule, FarmStockBusinessModule, OwnerOrderModule, DashboardModule],
  providers: [PrismaService],
})
export class AppModule {}
