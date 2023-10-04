import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    console.log('AuthService. validate user : ', email);

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
