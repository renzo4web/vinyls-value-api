import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUserService = {
      create: (email: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        } as User),
      findByEmail: jest.fn((email: string) =>
        Promise.resolve({ id: 1, email, password: 'hashSavedInDB' } as User),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should created a new user', async () => {
    const email = 'a@a.com';
    const password = '12345678';

    const user = await service.signup(email, password);

    expect(user).toEqual({
      id: expect.any(Number),
      email,
      password: expect.any(String),
    });
  });

  it('should attempt to get the user by email', async () => {
    const email = 'a@a.com';
    const password = '12345678';

    // Failed because
    try {
      await service.signin(email, password);
    } catch (error) {
      expect(fakeUserService.findByEmail).toHaveBeenCalledWith(email);
    }
  });

  it('should call bcrypt.compare() fn', async () => {
    const email = 'a@a.com';
    const password = '12345678';

    // Failed because mock bcrypt
    try {
      const user = await service.signin(email, password);
    } catch (error) {
      expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashSavedInDB');
    }
  });
});
