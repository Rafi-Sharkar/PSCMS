import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddFarmStockToBusinessDto, AddUserDto, CreateBusinessDto } from './dto/business.dto';

@Injectable()
export class BusinessService {
    constructor(private readonly prisma: PrismaService) {}

    async createBusiness(data: CreateBusinessDto) {
        const newBusiness = await this.prisma.business.create({ data });
        await this.prisma.user.update({
            where: {
                id: data.ownerId
            },
            data: {
                businessId: newBusiness.id
            }
        });
        return newBusiness;
    }

    async findBusinessesByOwnerId(ownerId: string) {
        return this.prisma.business.findUnique({
            where: {
                ownerId: ownerId
            }
        });
    }

    async deleteBusiness(id: string) {
        return this.prisma.business.delete({
            where: {
                id: id
            }
        });
    }

    async updateBusiness(ownerId: string, updateData: any) {
        return this.prisma.business.update({
            where: {
                ownerId: ownerId
            },
            data: updateData
        });
    }

    async addUserToBusiness(businessId: string, adduserdto: AddUserDto) {
        return this.prisma.userBusiness.create({
            data: {
                userId: adduserdto.userId,
                businessId: businessId,
                role: adduserdto.role
            }
        });
    }

    async getUsersInBusiness(businessId: string) {
        return this.prisma.userBusiness.findMany({
            where: {
                businessId: businessId
            }
        });
    }

    async removeUserFromBusiness(userBusinessId: string) {
        return this.prisma.userBusiness.delete({
            where: {
                id: userBusinessId
            }
        });
    }

    async addFarmStockToBusiness(businessId: string, addfarmstocktobusinessdto: AddFarmStockToBusinessDto) {
        const farmstock = await this.prisma.farmStock.findUnique({
            where: {
                id: addfarmstocktobusinessdto.farmStockId
            }
        });
        if (!farmstock) {
            throw new Error('Farm stock not found');
        }
        return this.prisma.farmStockforBusiness.create({
            data: {
                businessId: businessId,
                farmStockId: addfarmstocktobusinessdto.farmStockId,
                pricePerKg: farmstock.pricePerKg,
                availableKg: farmstock.availableKg,
                isActive: farmstock.isActive
            }
        });
    }

    async findFarmStockToBusiness(businessId: string) {
        return this.prisma.farmStockforBusiness.findMany({
            where: {
                businessId: businessId
            }
        })
    }

}
