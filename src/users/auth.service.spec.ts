import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

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

  //it('should throw a error when the user signup with invalid email format', async () => {
  //fakeUserService.find = () =>
  //Promise.resolve([{ id: 1, email: 'a', password: '1' }]);
  //});
});
