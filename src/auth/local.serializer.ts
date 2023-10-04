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
    console.log(user._id, ' : user_id test');
    done(null, user);
  }

  async deserializeUser(user: User, done: CallableFunction) {
    console.log(user, 'deserializeUser 함수 시작');
    done(null, user);
    console.log('deserializeUser 함수 끝');
  }
  // deserializeUser(
  //   payload: any,
  //   done: (err: Error, payload: string) => void,
  // ): any {
  //   console.log('deserializeUser 함수 test');
  //   done(null, payload);
  //   console.log('deserializeUser 함수 끝');
  // }
}
