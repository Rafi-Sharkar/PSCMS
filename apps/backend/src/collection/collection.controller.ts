import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { JwtAuthGuard } from 'src/auth/jwtauth.guard';
import { RoleAuthGuard } from 'src/auth/roleauth.guard';
import { CreateCollectionDto, UpdateCollectionDto } from './dto/collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Post()
  async createCollection(@Body() createcollectiondto: CreateCollectionDto) {
    return this.collectionService.createCollection(createcollectiondto)
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["EMPLOYEE"]))
  @Get()
  async getByEmployee(@Request() req: any) {
    const empId = req.user.id
    return this.collectionService.getByEmployee(empId)
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Get('/owner')
  async getByOwner(@Request() req: any) {
    const ownId = req.user.id
    return this.collectionService.getByOwner(ownId)
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["EMPLOYEE", "OWNER"]))
  @Get('/:id')
  async getByCollectionId(@Param('id') id: string) {
    return this.collectionService.getByCollectionId(id)
  }

  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["EMPLOYEE"]))
  @Patch('/:id')
  async updateCollection(@Param('id') id: string, updatecollectiondto: UpdateCollectionDto) {
    return this.collectionService.updateCollection(id, updatecollectiondto)
  }



}
