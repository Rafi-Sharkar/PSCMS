import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { UserRole } from "generated/prisma";

export class CreateUserDto {

    @ApiProperty({ example: "Rafi Sharkar", description: "Name of the user" })
    @IsString()
    name: string;

    @ApiProperty({ example: "+1234567890", description: "Phone number of the user" })
    @IsString()
    phone: string;

    @ApiProperty({ example: "password123", description: "Password for the user" })
    @IsString()
    password: string;

    @ApiProperty({ example: "OWNER", description: "Role of the user" })
    @IsEnum(UserRole, { message: 'Role must be one of the predefined user roles' })
    role: UserRole;

    @ApiProperty({ example: "Sector 14, Uttara, Dhaka", description: "Address of the user" })
    @IsString()
    address?: string;

    @ApiProperty({ example: "https://example.com/image.jpg", description: "Profile image URL of the user" })
    @IsString()
    imageUrl?: string;

    @ApiProperty({ example: "business-id-123", description: "If owner, then user have a Business ID" })
    @IsString()
    businessId?: string;
}


export class LoginDto {
  @ApiProperty({ example: '01234567890', description: 'Phone number of the user' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'password123', description: 'Password for the user account' })
  @IsString()
  password: string;
}


export class UpdateUserDto {

    @ApiProperty({ example: "Rafi Sharkar", description: "Name of the user" })
    @IsString()
    name?: string;

    @ApiProperty({ example: "password123", description: "Password for the user" })
    @IsString()
    password?: string;

    @ApiProperty({ example: "OWNER", description: "Role of the user" })
    @IsEnum(UserRole, { message: 'Role must be one of the predefined user roles' })
    role?: UserRole;

    @ApiProperty({ example: "Sector 14, Uttara, Dhaka", description: "Address of the user" })
    @IsString()
    address?: string;

    @ApiProperty({ example: "https://example.com/image.jpg", description: "Profile image URL of the user" })
    @IsString()
    imageUrl?: string;

    @ApiProperty({ example: "business-id-123", description: "If owner, then user have a Business ID" })
    @IsString()
    businessId?: string;
}