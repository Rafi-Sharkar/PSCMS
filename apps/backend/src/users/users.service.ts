import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'generated/prisma';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

    async create(createuserdto: CreateUserDto) {
        const argon2 = require('argon2');
        createuserdto.password = await argon2.hash(createuserdto.password);
        
        return this.prisma.user.create({
            data: {...createuserdto}
        })
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id }
        })
    }

    async findbyPhone(phone: string) {
        return this.prisma.user.findUnique({
            where: { phone }
        })
    }

    async login(id: string, name: string, phone: string, role: UserRole, businessId?: string) {
        const payload = { id, name, phone, role, businessId }

        const access_token = this.jwtService.sign(payload, {
            algorithm: 'HS256',
            expiresIn: '72h',
            secret: process.env.JWT_SECRET
        });
        return { access_token }
    }

    async update(id: string, updateUserDto: any) {
        const argon2 = require('argon2');
        updateUserDto.password = await argon2.hash(updateUserDto.password);
        return this.prisma.user.update({
            where: { id },
            data: { ...updateUserDto }
        });
    }

    async getAllUsers() {
        return this.prisma.user.findMany()
    }

    async filteredByRoles(role: UserRole) {
        return this.prisma.user.findMany({
            where: {
                role: { equals: role }
            }
        });
    }
}
