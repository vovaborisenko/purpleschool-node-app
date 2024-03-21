import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

export interface IUsersService {
  createUser: (user: UserRegisterDto) => Promise<User | null>;
  validateUser: (user: User) => Promise<boolean>;
}
