import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUser(email);
    if (!user) return null;
    const passCheck = await bcrypt.compare(pass, user.password);
    if (passCheck) {
      const { password, ...result } = user;
      return result; //password 제외하고 return
    }
    return null; //비밀번호 불일치
  }
}
