import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollectionDto, UpdateCollectionDto } from './dto/collection.dto';

@Injectable()
export class CollectionService {
    constructor(private readonly prisma: PrismaService) {}

    async createCollection(createcollectiondto: CreateCollectionDto) {
        return this.prisma.collection.create({
            data: {...createcollectiondto}
        })
    }

    async getByEmployee(empId: string) {
        const empBus = await this.prisma.userBusiness.findUnique({where: {userId: empId}})
        return this.prisma.collection.findMany({where: {employeeId: empBus?.id}})
    }

    async getByOwner(ownId: string) {
        const owner = await this.prisma.user.findUnique({where: {id: ownId}})
        if (!owner?.businessId) {
            return [];
        }
        return this.prisma.collection.findMany({where: {businessId: owner.businessId}})
    }

    async getByCollectionId(id: string) {
        return this.prisma.collection.findUnique({where: {id: id}})
    }

    async updateCollection(id: string, updatecollectiondto: UpdateCollectionDto) {
        return this.prisma.collection.update({
            where: {id: id},
            data: {...updatecollectiondto}
        })
    }
}
