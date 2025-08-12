import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { OwnerOrderService } from './owner_order.service';
import { CreateOwnerOrderDto, UpdateOwnerOrderDto } from './dto/ownerorder.dto';
import { JwtAuthGuard } from 'src/auth/jwtauth.guard';
import { RoleAuthGuard } from 'src/auth/roleauth.guard';

@Controller('ownerorder')
export class OwnerOrderController {
  constructor(private readonly ownerOrderService: OwnerOrderService) {}

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Post()
  async createOwnerOrder(@Request() req: any ,@Body() createownerorderdto: CreateOwnerOrderDto){
    const ownerId = req.user.id
    return this.ownerOrderService.createOwnerOrder(ownerId, createownerorderdto)
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Get()
  async getOwnerOrderbyOwner(@Request() req: any) {
    return this.ownerOrderService.findbyOwnerId(req.user.id)
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Get('/:id')
  async getOwnerOrderbyId(@Param('id') id: string) {
    return this.ownerOrderService.getOwnerOrderbyId(id)
  }

  @Patch('/:id')
  async updateOwnerOrder(@Param('id') id: string, @Body() updateownerorderdto: UpdateOwnerOrderDto) {
    return this.ownerOrderService.updateOwnerOrder(id, updateownerorderdto)
  }
}
