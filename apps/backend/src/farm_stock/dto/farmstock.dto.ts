import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";
import { ProductNames } from "generated/prisma";

export class CreateFarmStockDto {

    @ApiProperty({ example: "http://example.com/image.jpg", description: "Image URL of the farm stock" })
    @IsString()
    imageUrl?: string;

    @ApiProperty({ example: "BROILER", description: "Type of the farm stock" })
    @IsEnum(ProductNames, { message: 'Product name must be one of the predefined product names' })
    productName: ProductNames;

    @ApiProperty({ example: "Fresh Broiler Chicken", description: "Description of the farm stock" })
    @IsString()
    description?: string;

    @ApiProperty({ example: 150, description: "Price per kg of the farm stock" })
    @IsNumber()
    pricePerKg: number;

    @ApiProperty({ example: 1000, description: "Available quantity in kg of the farm stock" })
    @IsNumber()
    availableKg: number;

    @ApiProperty({ example: true, description: "Is the farm stock active?" })
    @IsBoolean()
    isActive: boolean;
}


export class UpdateFarmStockDto {

    @ApiProperty({ example: "http://example.com/image.jpg", description: "Image URL of the farm stock" })
    @IsString()
    imageUrl?: string;

    @ApiProperty({ example: "Fresh Broiler Chicken", description: "Description of the farm stock" })
    @IsString()
    description?: string;

    @ApiProperty({ example: 150, description: "Price per kg of the farm stock" })
    @IsNumber()
    pricePerKg?: number;

    @ApiProperty({ example: 1000, description: "Available quantity in kg of the farm stock" })
    @IsNumber()
    availableKg?: number;

    @ApiProperty({ example: true, description: "Is the farm stock active?" })
    @IsBoolean()
    isActive?: boolean;
}


