import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(@Body() createuserDto: CreateUserDto): Promise<User> {
    const user = this.authService.signup(createuserDto);
    return user;
  }

  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: User })
  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
