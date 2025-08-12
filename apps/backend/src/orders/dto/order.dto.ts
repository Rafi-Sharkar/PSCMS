import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { OrderStatus, PaymentStatus, ProductNames } from "generated/prisma";

export class CreateOrderDto {
    @IsString()
    businessId: string;

    @IsString()
    assignedToId?: string;

    @IsEnum(ProductNames, { message: 'ProductName must be one of the predefined Product name' })
    productName: ProductNames;

    @IsNumber()
    quantityKg: number;

    @IsNumber()
    totalPrice: number;

    @IsString()
    deliveryAddress: string;

    @Type(() => Date)
    @IsDate()
    deliveryTime: Date;

    @IsString()
    collectionId?: string;

    @IsEnum(OrderStatus)
    deliveryStatus?: OrderStatus;

    @IsEnum(PaymentStatus)
    paymentStatus?: PaymentStatus;
}


export class UpdateOrderDto {
    @IsString()
    assignedToId?: string;

    @IsString()
    collectionId?: string;

    @IsEnum(OrderStatus)
    deliveryStatus?: OrderStatus;

    @IsEnum(PaymentStatus)
    paymentStatus?: PaymentStatus;
}