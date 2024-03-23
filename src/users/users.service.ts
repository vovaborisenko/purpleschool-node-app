import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import 'reflect-metadata';

@injectable()
export class UsersService implements IUsersService {
  constructor(@inject(TYPES.IConfigService) private config: IConfigService) {}

  public async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    const salt = this.config.get('SALT');

    await newUser.setPassword(password, Number(salt));

    return null;
  }

  public async validateUser(user: User): Promise<boolean> {
    return false;
  }
}
