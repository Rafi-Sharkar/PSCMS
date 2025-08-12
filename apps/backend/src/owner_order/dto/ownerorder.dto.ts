import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { OwnerOrderStatus, PaymentStatus, ProductNames } from "generated/prisma";

export class CreateOwnerOrderDto{
    @IsString()
    farmStockIdforBusiness: string;

    @IsString()
    businessId: string;

    @IsEnum(ProductNames)
    productName: ProductNames;

    @IsNumber()
    quantityKg: number;

    @IsNumber()
    totalPrice: number;

    @Type(()=> Date)
    @IsDate()
    pickupTime: Date;
}

export class UpdateOwnerOrderDto{
    @IsString()
    assignedToId?: string;

    @IsString()
    collectionId?: string;

    @IsEnum(OwnerOrderStatus)
    ownerOrderStatus?: OwnerOrderStatus;

    @IsEnum(PaymentStatus)
    paymentStatus?: PaymentStatus
}