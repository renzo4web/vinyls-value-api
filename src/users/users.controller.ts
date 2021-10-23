import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body() createuserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createuserDto);
    return user;
  }

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
