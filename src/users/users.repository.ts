import { PrismaService } from './../database/prisma.service';
import { User as UserModel } from '@prisma/client';
import { User } from './user.entity';
import { IUserRepository } from './users.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  create({ email, name, password }: User): Promise<UserModel> {
    return this.prismaService.client.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  find(email: string): Promise<UserModel | null> {
    return this.prismaService.client.user.findFirst({
      where: { email },
    });
  }
}
