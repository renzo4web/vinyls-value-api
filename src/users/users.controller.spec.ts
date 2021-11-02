import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService> = {};
  let fakeAuthService: Partial<AuthService> = {};

  beforeEach(async () => {
    const mockUser = {
      id: 222,
      email: 'a@a.com',
      password: '12345678',
    };

    fakeUserService = {
      findOne: jest.fn((id) => Promise.resolve({ ...mockUser, id } as User)),
      findByEmail: jest.fn((email: string) =>
        Promise.resolve({ ...mockUser, email } as User),
      ),
    };

    fakeAuthService = {
      signin: jest.fn((email: string, password: string) =>
        Promise.resolve({ ...mockUser, email } as User),
      ),

      signup: jest.fn((email: string, password: string) =>
        Promise.resolve({ ...mockUser, email } as User),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a user when signup', async () => {
    const email = 'a@a.com';
    const password = '12345678';

    const session = {};

    const res = await controller.createUser({ email, password }, session);

    expect(res).toEqual({
      id: expect.any(Number),
      email,
      password,
    });
  });

  it('should call authService.signin', async () => {
    const email = 'a@a.com';
    const password = '12345678';

    const session = {
      userId: 7,
    };

    await controller.loginUser({ email, password }, session);

    expect(fakeAuthService.signin).toHaveBeenCalled();
  });
});
