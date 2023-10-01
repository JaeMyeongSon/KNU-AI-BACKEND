import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GetUsersDto } from './dto/get-users.dto';
import { PostUserDto } from './dto/post-user-request.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: '유저 전체 조회' })
  @ApiOkResponse({
    description: '유저의 목록',
    type: GetUsersDto,
  })
  async getAllUsers() {
    return await this.usersService.getUsers();
  }

  @Post()
  @ApiOperation({ summary: '유저 생성->추후 로그인으로 대체' })
  @ApiOkResponse({
    description: '유저의 생성완료',
    type: PostUserDto,
  })
  async makeUsers(@Body() content: PostUserDto) {
    const { userName, password } = content;
    return await this.usersService.createUser(userName, password);
  }
}
