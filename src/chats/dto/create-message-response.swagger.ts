import { BaseResponseSwagger } from '../../common/swagger/base-response.swagger';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageResponseSwagger implements BaseResponseSwagger {
  @ApiProperty({
    required: true,
    example:
      '챗봇은 인간의 대화를 시뮬레이션하고 처리하는 컴퓨터 프로그램입니다.',
    description: '사용자의 메시지에 대한 챗봇의 응답',
  })
  data: string;
}
