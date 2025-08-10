import { Body, ConflictException, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { FarmStockService } from './farm_stock.service';
import { CreateFarmStockDto, UpdateFarmStockDto } from './dto/farmstock.dto';
import { JwtAuthGuard } from 'src/auth/jwtauth.guard';
import { RoleAuthGuard } from 'src/auth/roleauth.guard';
import { JsonWebTokenError } from '@nestjs/jwt';

@Controller('farmstock')
export class FarmStockController {
  constructor(private readonly farmStockService: FarmStockService) {}

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["FARMER"]))
  @Post()
  async createFarmStock(@Body() createfarmstockdto: CreateFarmStockDto, @Request() req: any) {
    const farmerId = req.user.id;
    return this.farmStockService.create(createfarmstockdto, farmerId);
  }

  @Get()
  async getAllFarmStocks() {
    return this.farmStockService.findAll();
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["FARMER"]))
  @Get('/myfarmstock')
  async getMyFarmStocks(@Request() req: any) {
    const farmerId = req.user.id;
    return this.farmStockService.findAllByFarmerId(farmerId);
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["FARMER"]))
  @Patch("/myfarmstock/:id")
  async updateFarmStock(@Param('id') id: string , @Body() updatefarmstockdto: UpdateFarmStockDto) {
    const farmstock = await this.farmStockService.findById(id)
    if(!farmstock) {
      throw new ConflictException("FarmStock is not found")
    }
    return this.farmStockService.updateFarmStock(id, updatefarmstockdto)
  }

  // @UseGuards(JwtAuthGuard, new RoleAuthGuard(["FARMER"]))
  @Delete("/myfarmstock/:id")
  async deleteFarmStock(@Param('id') id: string) {
    const farmstock = await this.farmStockService.findById(id)
    if(!farmstock) {
      throw new ConflictException("FarmStock is not found")
    }
    return this.farmStockService.deleteFarmStock(id)
  }

}
