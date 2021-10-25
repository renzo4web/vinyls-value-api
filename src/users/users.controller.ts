import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(
    @Body() { email, password }: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Get('who')
  @UseInterceptors(CurrentUserInterceptor)
  async who(@CurrentUser() user: User): Promise<any> {
    //return this.usersService.findOne(session.userId);
  }

  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('signin')
  async loginUser(
    @Body() { email, password }: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signin(email, password);

    session.userId = user.id;

    console.log(session);

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
