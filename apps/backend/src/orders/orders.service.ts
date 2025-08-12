import { ConfigurableModuleBuilder, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) {}

    async createOrder(customerId: string ,createorderdto: CreateOrderDto) {
        const customer = await this.prisma.userBusiness.findUnique({where: {userId: customerId}})
        if( !customer){
            throw new ConflictException("Customer not exist")
        }
        return await this.prisma.order.create({
            data: {
                customerId: customer.id,
                ...createorderdto
            }
        })
    }

    async getOrderByCustomer(customerId: string){
        const customer = await this.prisma.userBusiness.findUnique({where: {userId: customerId}})

        if(!customer){
            throw new ConflictException("Customer not in business")
        }
        return await this.prisma.order.findMany({
            where: {customerId: customer?.id}
        })
    }

    async getOrderById(orderId: string) {
        return await this.prisma.order.findUnique({
            where: {id: orderId}
        })
    }

    async updateOrder(orderId: string, updateorderdto: UpdateOrderDto) {
        const order = await this.prisma.order.findUnique({where: {id: orderId}})
        if(!order) {
            throw new ConflictException("Order not found")
        }
        return await this.prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                ...updateorderdto
            }

        })
    }
}
