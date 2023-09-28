import { BaseResponseSwagger } from './base-response.swagger';
import { ApiProperty } from '@nestjs/swagger';

export class ExampleResponseSwagger extends BaseResponseSwagger {
  @ApiProperty({
    required: true,
    example: 2,
    description: '예시용 클래스. 추후 삭제 예정',
  })
  data: number;
}
