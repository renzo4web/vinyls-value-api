import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string): Promise<User> {
    const user = this.usersService.create(email, password);
    return user;
  }

  async signin(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException();
    }

    return user;
  }
}
