import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from 'generated/prisma';
import { JwtAuthGuard } from 'src/auth/jwtauth.guard';
import { RoleAuthGuard } from 'src/auth/roleauth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "To get all user and filter by role"})
  @ApiResponse({status: 200, type: CreateUserDto})
  @UseGuards(JwtAuthGuard, new RoleAuthGuard(["OWNER"]))
  @Get()
  async getAllUsers(@Query('role') role: UserRole){
    if (role){
      return this.usersService.filteredByRoles(role)
    }
    return this.usersService.getAllUsers()
  }

  @ApiOperation({summary: "Get user by ID"})
  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

}
