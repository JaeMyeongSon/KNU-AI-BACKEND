import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schemas';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // async getUsers(): Promise<string[]> {
  //   const users = await this.userModel.find();

  //   return users.map((user): string => user.email);
  // }

  async findOneUser(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
  async createUser(email: string, password: string) {
    //user 중복 검사
    const isUserExist = await this.userModel.exists({ email });
    if (isUserExist) {
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');
    }
    console.log('중복 통과', email);
    const hashedPassword = await bcrypt.hash(password, 12); //비밀번호 암호화
    //유저 생성
    const returnUser = await this.userModel.create({
      email,
      password: hashedPassword,
    });
    return returnUser;
  }
}
