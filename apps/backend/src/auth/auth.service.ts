import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, UpdateUserDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async register(createuserdto: any) {
        const existingUser = await this.userService.findbyPhone(createuserdto.phone);
        if (existingUser) {
            throw new ConflictException('User with this phone number already exists');
        }
        return this.userService.create(createuserdto)
    }

    async validateUser(logindto: LoginDto) {
        const user = await this.userService.findbyPhone(logindto.phone);
        const argon2 = require('argon2');
        const isMatch = await argon2.verify(user?.password, logindto.password);

        if (!user || !isMatch || user.phone !== logindto.phone) {
            throw new UnauthorizedException('Invalid phone number or password');
        }
        return this.userService.login(user.id, user.name, user.phone, user.role, user.businessId? user.businessId : undefined);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

}
