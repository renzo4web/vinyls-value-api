import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    try {
      const user = this.usersRepository.create({ email, password });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Email in use');
    }
  }

  async findOne(id: number): Promise<User> {
    if (!id) {
      return null;
    }

    return await this.usersRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
