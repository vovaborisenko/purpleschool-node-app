import 'reflect-metadata';
import { User as UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersService } from './users.service.interface';
import { IUserRepository } from './users.repository.interface';
import { UsersService } from './users.service';
import { User } from './user.entity';

const ConfigServiceMock: IConfigService = {
  get: jest.fn((key) => key),
};
const UserRepositoryMock: IUserRepository = {
  create: jest.fn(),
  find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let userRepository: IUserRepository;
let userService: IUsersService;

beforeAll(() => {
  container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(ConfigServiceMock);
  container.bind<IUserRepository>(TYPES.UserRepository).toConstantValue(UserRepositoryMock);
  container.bind<IUsersService>(TYPES.IUsersService).to(UsersService);

  configService = container.get<IConfigService>(TYPES.IConfigService);
  userRepository = container.get<IUserRepository>(TYPES.UserRepository);
  userService = container.get<IUsersService>(TYPES.IUsersService);
});

describe('Users Service', () => {
  it('createUser', async () => {
    userRepository.find = jest.fn().mockResolvedValueOnce(null);
    userRepository.create = jest.fn().mockImplementationOnce(
      ({ email, name, password }: User): UserModel => ({
        email,
        name,
        password,
        id: 1,
      }),
    );

    const createdUser = await userService.createUser({
      email: 'bar@foo.com',
      name: 'foo',
      password: '1',
    });

    expect(createdUser?.id).toBe(1);
    expect(createdUser?.password).not.toBe('1');
  });
});
