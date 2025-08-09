import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { UserRole } from "generated/prisma";

export class CreateBusinessDto {
  @ApiProperty({example: "My Business", description: "The name of the business"})
  @IsString()
  name: string;

  @ApiProperty({example: "user-123", description: "The ID of the business owner"})
  @IsString()
  ownerId: string;

  @ApiProperty({example: "A brief description of the business", description: "The description of the business"})
  @IsString()
  description?: string;

  @ApiProperty({example: "https://example.com/image.png", description: "The image URL of the business"})
  @IsString()
  imageUrl?: string;

  @ApiProperty({example: "123 Main St, Anytown, USA", description: "The address of the business"})
  @IsString()
  address?: string;
}

export class UpdateBusinessDto {
  @ApiProperty({example: "My Business", description: "The name of the business"})
  @IsString()
  name?: string;

  @ApiProperty({example: "user-123", description: "The ID of the business owner"})
  @IsString()
  ownerId?: string;

  @ApiProperty({example: "A brief description of the business", description: "The description of the business"})
  @IsString()
  description?: string;

  @ApiProperty({example: "https://example.com/image.png", description: "The image URL of the business"})
  @IsString()
  imageUrl?: string;

  @ApiProperty({example: "123 Main St, Anytown, USA", description: "The address of the business"})
  @IsString()
  address?: string;
}

export class AddUserDto {
  @ApiProperty({example: "user-123", description: "The ID of the user to add"})
  @IsString()
  userId: string;

  @ApiProperty({ example: "EMPLOYEE", description: "Role of the user" })
  @IsEnum(UserRole, { message: 'Role must be one of the predefined user roles' })
  role: UserRole;
}
