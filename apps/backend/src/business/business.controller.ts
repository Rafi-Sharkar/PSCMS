import { Body, ConfigurableModuleBuilder, ConflictException, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { AddFarmStockToBusinessDto, AddUserDto, CreateBusinessDto, UpdateBusinessDto } from './dto/business.dto';
import { JwtAuthGuard } from 'src/auth/jwtauth.guard';
import { RoleAuthGuard } from 'src/auth/roleauth.guard';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Post()
  async createBusiness(@Body() createBusinessDto: CreateBusinessDto) {
    const isExisting = await this.businessService.findBusinessesByOwnerId(createBusinessDto.ownerId)
    if (isExisting) {
      throw new ConflictException('Owner can create One business');
    }
    return this.businessService.createBusiness(createBusinessDto);
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Get('/mybusiness')
  async getMyBusiness(@Request() req: any) {
    const ownerId = req.user.id;
    return this.businessService.findBusinessesByOwnerId(ownerId);
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Delete(':id')
  async deleteBusiness(@Param('id') id: string) {
    return this.businessService.deleteBusiness(id);
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Patch('/mybusiness')
  async updateMyBusiness(@Request() req: any, @Body() updateBusinessDto: UpdateBusinessDto) {
    const ownerId = req.user.id;
    return this.businessService.updateBusiness(ownerId, updateBusinessDto);
  }


  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Post('/users/add')
  async addUserToBusiness(@Request() req: any, @Body() adduserdto: AddUserDto) {
    const businessId = req.user.id;
    const business = await this.businessService.findBusinessesByOwnerId(businessId);
    if (!business) {
      throw new ConflictException('Business not found');
    }
    return this.businessService.addUserToBusiness(business.id, adduserdto);
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Get('/users')
  async getUsersInBusiness(@Request() req: any) {
    const ownerId = req.user.id;
    const business = await this.businessService.findBusinessesByOwnerId(ownerId);
    if (!business) {
      throw new ConflictException('Business not found');
    }
    return this.businessService.getUsersInBusiness(business.id);
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Delete('/users/:userId')
  async removeUserFromBusiness(@Request() req: any, @Param('userId') userBusinessId: string) {
    const ownerId = req.user.id;
    const business = await this.businessService.findBusinessesByOwnerId(ownerId);
    if (!business) {
      throw new ConflictException('Business not found');
    }
    return this.businessService.removeUserFromBusiness(userBusinessId);
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Post('/farmstock')
  async addFarmStockToBusiness(@Request() req: any, @Body() addfarmstocktobusinessdto: AddFarmStockToBusinessDto) {
    const ownerId = req.user.id;
    const business = await this.businessService.findBusinessesByOwnerId(ownerId);
    if (!business) {
      throw new ConflictException('Business not found');
    }
    return this.businessService.addFarmStockToBusiness(business.id, addfarmstocktobusinessdto);
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Get('/farmstock')
  async farmstockForBusiness(@Request() req: any) {
    const ownerId = req.user.id
    const business = await this.businessService.findBusinessesByOwnerId(ownerId)
    if( !business){
      throw new ConflictException("Business not found")
    }
    return this.businessService.findFarmStockToBusiness(business.id)

  }

}