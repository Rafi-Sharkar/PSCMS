import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOwnerOrderDto, UpdateOwnerOrderDto } from './dto/ownerorder.dto';
import { create } from 'domain';

@Injectable()
export class OwnerOrderService {
    constructor(private readonly prisma: PrismaService) {}


    async createOwnerOrder(ownerId: string, createownerorder: CreateOwnerOrderDto) {
        
        return await this.prisma.ownerOrder.create({
            data: {
                ownerId: ownerId,
                ...createownerorder
            }
        })
    }

    async findbyOwnerId(ownerId: string) {
        return this.prisma.ownerOrder.findMany({where: {ownerId: ownerId}})
    }

    async getOwnerOrderbyId(id: string) {
        return this.prisma.ownerOrder.findUnique({where: {id: id}})
    }

    async updateOwnerOrder(id: string, updateownerorderdto: UpdateOwnerOrderDto) {
        return this.prisma.ownerOrder.update({where: {id: id},data: {...updateownerorderdto}})
    }
}
