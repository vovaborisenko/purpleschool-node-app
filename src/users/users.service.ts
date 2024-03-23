import { User as UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import 'reflect-metadata';
import { IUserRepository } from './users.repository.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { sign } from 'jsonwebtoken';

@injectable()
export class UsersService implements IUsersService {
  constructor(
    @inject(TYPES.IConfigService) private config: IConfigService,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
  ) {}

  public async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    if (await this.userRepository.find(email)) {
      return null;
    }

    const newUser = new User(email, name);
    const salt = this.config.get('SALT');

    await newUser.setPassword(password, Number(salt));

    return this.userRepository.create(newUser);
  }

  public async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.userRepository.find(email);

    if (!existedUser) {
      return false;
    }

    const user = new User(existedUser.email, existedUser.name, existedUser.password);

    return user.comparePassword(password);
  }

  public signJWT(email: string, secret: string): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(
        {
          email,
          ait: Math.floor(Date.now() / 1000),
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (error, token) => {
          if (token) {
            resolve(token);
          }

          reject(error);
        },
      );
    });
  }
}
