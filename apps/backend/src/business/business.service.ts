import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddUserDto, CreateBusinessDto } from './dto/business.dto';

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

}
