import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BusinessModule } from './business/business.module';
import { FarmstocksModule } from './farmstocks/farmstocks.module';
import { OrdersModule } from './orders/orders.module';
import { OwnerordersModule } from './ownerorders/ownerorders.module';
import { CollectionModule } from './collection/collection.module';
import { TrackingModule } from './tracking/tracking.module';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [AuthModule, UsersModule, BusinessModule, FarmstocksModule, OrdersModule, OwnerordersModule, CollectionModule, TrackingModule],
  providers: [PrismaService],
})
export class AppModule {}
