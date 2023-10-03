import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    console.log(user, 'serializeUser 함수 test');
    done(null, user._id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    return await this.userModel
      .findById(userId)
      .then((user) => {
        console.log('user', user);
        done(null, user);
      })
      .catch((err) => done(err));
  }
}
