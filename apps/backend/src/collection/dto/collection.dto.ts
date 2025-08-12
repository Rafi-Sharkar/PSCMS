import { IsEnum, IsNumber, IsString } from "class-validator";
import { CollectionStatus } from "generated/prisma";

export class CreateCollectionDto {
    @IsString()
    employeeId: string;

    @IsString()
    businessId: string;

    @IsNumber()
    collectionTargetKg: number;
}

export class UpdateCollectionDto {
    @IsNumber()
    collectedKg: number

    @IsEnum(CollectionStatus)
    collectionStatus: CollectionStatus
}
