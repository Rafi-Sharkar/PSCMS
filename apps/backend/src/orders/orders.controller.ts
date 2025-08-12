import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { JwtAuthGuard } from 'src/auth/jwtauth.guard';
import { RoleAuthGuard } from 'src/auth/roleauth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["CUSTOMER"]))
  @Post()
  async createOrder(@Body() createorderdto: CreateOrderDto, @Request() req: any) {
    const customerId = req.user.id
    return this.ordersService.createOrder(customerId, createorderdto)
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["CUSTOMER"]))
  @Get('/my')
  async getOrder(@Request() req: any){
    const customerId = req.user.id
    return this.ordersService.getOrderByCustomer(customerId)
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["CUSTOMER"]))
  @Get('/:id')
  async getOrderbyId(@Param('id') id: string) {
    return this.ordersService.getOrderById(id)
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Patch('/:id')
  async updateOrder(@Param('id') id: string ,@Body() updateorderdto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateorderdto)
  }
}
