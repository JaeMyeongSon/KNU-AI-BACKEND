import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    console.log(user.id, 'serializeUser 함수 test');
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    console.log(userId, 'deserializeUser 함수 시작');

    return await this.usersRepository
      .findOneOrFail({
        where: { id: +userId },
        select: ['id', 'email'],
      })
      .then((user) => {
        console.log('user', user);
        done(null, user);
        console.log('deserializeUser 함수 끝');
      })
      .catch((error) => done(error));
  }
}
