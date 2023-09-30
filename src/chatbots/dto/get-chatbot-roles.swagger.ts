import { BaseResponseSwagger } from '../../common/swagger/base-response.swagger';
import { ApiProperty } from '@nestjs/swagger';

export class GetChatbotRolesSwagger implements BaseResponseSwagger {
  @ApiProperty({
    required: true,
    example: ['lawyer'],
    type: [String],
    description: '챗봇의 역할 목록',
  })
  data: string[];
}
