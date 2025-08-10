import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFarmStockDto, UpdateFarmStockDto } from './dto/farmstock.dto';

@Injectable()
export class FarmStockService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createfarmstockdto: CreateFarmStockDto, farmerId: string) {
        return this.prisma.farmStock.create({
            data: { 
                farmerId: farmerId,
                ...createfarmstockdto
             },
        });
    }

    async findAll() {
        return await this.prisma.farmStock.findMany();
    }

    async findAllByFarmerId(farmerId: string) {
        return await this.prisma.farmStock.findMany({
            where: { farmerId: farmerId },
        });
    }

    async findById(id: string) {
        return this.prisma.farmStock.findUnique({
            where: {id: id}
        })
    }

    async updateFarmStock(farmstockId: string, updatefarmstockdto: UpdateFarmStockDto) {
        await this.prisma.farmStock.update({
            where: { id: farmstockId},
            data: {...updatefarmstockdto}
        })
        await this.prisma.farmStockforBusiness.update({
            where: {farmStockId: farmstockId},
            data: {
                pricePerKg: updatefarmstockdto.pricePerKg,
                availableKg: updatefarmstockdto.availableKg,
                isActive: updatefarmstockdto.isActive
            }
        })

        return "FarmStack and FarmStackForBusiness are updated"
    }

    async deleteFarmStock(id: string) {
        
        const farmstock = await this.prisma.farmStock.findUnique({where: {id: id}})
        
        if(!farmstock){
            throw new ConflictException("FarmStack doesn't exist")
        }
        await this.prisma.farmStockforBusiness.delete({
            where: {farmStockId: id}
        })
    
        await this.prisma.farmStock.delete({
            where: {id: id}
        })

        return "FarmStack and FarmStackForBusiness are deleted"

    }
}
