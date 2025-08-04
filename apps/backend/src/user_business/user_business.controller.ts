import { Controller } from '@nestjs/common';
import { UserBusinessService } from './user_business.service';

@Controller('user-business')
export class UserBusinessController {
  constructor(private readonly userBusinessService: UserBusinessService) {}
}
