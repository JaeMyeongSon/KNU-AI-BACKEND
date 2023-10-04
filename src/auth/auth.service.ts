import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';

import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
    console.log('AuthService. validate user_id : ', user.id);

    if (!user) {
      return null;
    }

    const passCheck = await bcrypt.compare(pass, user.password);
    if (passCheck) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword; //password 제외하고 return
    }
    return null; //비밀번호 불일치
  }
}
