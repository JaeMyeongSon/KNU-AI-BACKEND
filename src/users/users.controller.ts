import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JoinRequestDto } from './dto/join.request.dto';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard copy';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { LoginReqDto } from './dto/login.request.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { UsersDto } from './dto/users.dto';
import { InjectUser } from '../common/decorators/user.decorator';
import { User } from '../entities/user';
import { EmailsDto } from './dto/emails.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sendVerifyEmail')
  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '이메일 인증 요청' })
  @ApiOkResponse({
    description: '회원가입 전 이메일 인증',
    type: EmailsDto,
    //TODO : email DTO 작성
  })
  async sendVerification(@Body() content: EmailsDto) {
    console.log('email인증 출력 : ', content.email);
    await this.usersService.sendEmailVerifiy(content.email);
  }

  @Get()
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '로그인된 유저 조회' })
  @ApiOkResponse({
    description: '현재 유저 정보를 반환',
    type: UsersDto,
  })
  getUser(@InjectUser() user: User) {
    return UsersDto.fromEntity(user);
  }

  @Post()
  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' })
  @ApiOkResponse({
    description: '유저의 생성완료',
    type: JoinRequestDto,
  })
  @ApiBadRequestResponse({
    description: '잘못된 이메일 양식 - email must be an email',
    status: 400,
  })
  async join(@Body() content: JoinRequestDto) {
    const { email, password, verify } = content;
    // console.log(email, ' : test이메일 출력');
    const user = await this.usersService.createUser(email, password, verify);
    return UsersDto.fromEntity(user);
  }

  @ApiResponse({
    type: LoginReqDto,
    status: 200,
    description: '성공',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard) //인터셉터보다 먼저 실행
  @Post('login')
  async login(@InjectUser() user: User) {
    return UsersDto.fromEntity(user);
  }

  @UseGuards(new LoggedInGuard()) // 로그인한경우만 사용할수있게함
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    console.log('로그아웃 시작');
    req.logOut(function () {
      res.clearCookie('connect.sid', { httpOnly: true });
      res.send('ok');
    });
  }
}
