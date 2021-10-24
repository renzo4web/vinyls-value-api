import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const user = this.usersService.create(createUserDto);
    return user;
  }
}
