import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JoinRequestDto } from './dto/join.request.dto';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard copy';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 보안상 전체 유저 조회 삭제
  // @Get()
  // @ApiOperation({ summary: '유저 전체 조회' })
  // @ApiOkResponse({
  //   description: '유저의 목록',
  //   type: GetUsersDto,
  // })
  // async getAllUsers() {
  //   return await this.usersService.getUsers();
  // }

  // @Post()
  // @ApiOperation({ summary: '유저 생성->추후 로그인으로 대체' })
  // @ApiOkResponse({
  //   description: '유저의 생성완료',
  //   type: PostUserDto,
  // })
  // async makeUsers(@Body() content: PostUserDto) {
  //   const { email, password } = content;
  //   return await this.usersService.createUser(email, password);
  // }

  @Post()
  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' })
  @ApiOkResponse({
    description: '유저의 생성완료',
    type: JoinRequestDto,
  })
  async join(@Body() content: JoinRequestDto) {
    const { email, password } = content;
    return await this.usersService.createUser(email, password);
  }
}
