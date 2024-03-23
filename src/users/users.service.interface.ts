import { User as UserModel } from '@prisma/client';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';

export interface IUsersService {
  createUser: (user: UserRegisterDto) => Promise<UserModel | null>;
  validateUser: (user: UserLoginDto) => Promise<boolean>;
  signJWT: (email: string, secret: string) => Promise<string>;
}
