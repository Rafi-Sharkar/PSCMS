import { Module } from '@nestjs/common';
import { UserBusinessService } from './user_business.service';
import { UserBusinessController } from './user_business.controller';

@Module({
  controllers: [UserBusinessController],
  providers: [UserBusinessService],
})
export class UserBusinessModule {}
