import { injectable } from 'inversify';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import 'reflect-metadata';

@injectable()
export class UsersService implements IUsersService {
  public async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);

    await newUser.setPassword(password);

    return null;
  }

  public async validateUser(user: User): Promise<boolean> {
    return false;
  }
}
