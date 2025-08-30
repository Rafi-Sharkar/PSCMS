import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, UpdateUserDto } from 'src/users/dto/users.dto';
import { ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwtauth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBadRequestResponse({ description: "Invalid user data & User already exist" })
  @ApiResponse({ status: 201, description: 'User successfully registered' , type: CreateUserDto })
  @Post('/register')
  async register(@Body() createuserdto: CreateUserDto) {
    return this.authService.register(createuserdto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiBadRequestResponse({ description: "Invalid login credentials" })
  @ApiResponse({ status: 200, description: 'User successfully logged in and refresh token', type: String })
  @Post('/login')
  async login(@Body() logindto: LoginDto) {
    return await this.authService.validateUser(logindto);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiBadRequestResponse({ description: "Invalid user token expired" })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getProfile(@Request() req: any) {
    return this.authService.getUserInfo(req.user.phone);
  }

  @ApiOperation({ summary: 'Edit user profile' })
  @ApiBadRequestResponse({ description: "Invalid user info" })
  @UseGuards(JwtAuthGuard)
  @Patch('/me/edit')
  async editProfile(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(req.user.id, updateUserDto);
  }

}
