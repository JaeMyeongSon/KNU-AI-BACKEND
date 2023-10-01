import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUser(userName: string): Promise<any> {
    try {
      const result = await this.userModel.findOne({ userName }).lean();
      return result;
    } catch (err) {
      console.log('error...');
    }
  }
}
