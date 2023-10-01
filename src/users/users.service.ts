import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schemas';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers(): Promise<string[]> {
    const users = await this.userModel.find();

    return users.map((user): string => user.email);
  }
  async createUser(email: string, password: string) {
    const user = await this.userModel.create({
      email,
      password,
    });
    console.log(email, ' 생성완료');
    return user;
  }
}
