import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseSwagger {
  @ApiProperty({
    required: true,
    example: 'Base Response',
    description:
      'Swagger에서 사용하기 위한 Base Response Type. 해당 클래스를 상속해서 Swagger용 응답 객체 생성',
  })
  data: any;
}
