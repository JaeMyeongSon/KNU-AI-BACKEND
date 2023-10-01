import { ApiProperty } from '@nestjs/swagger';

export class GetUsersDto {
  @ApiProperty({
    required: true,
    example: ['user1', 'user2'],
    type: [String],
    description: 'user 전체 목록 조회',
  })
  users: string[];
}
