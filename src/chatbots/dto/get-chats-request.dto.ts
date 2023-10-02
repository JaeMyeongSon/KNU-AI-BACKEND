import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetChatsRequestDto {
  @ApiProperty({
    required: true,
    type: String,
    description: '챗봇의 ID',
  })
  chatbotId: string;

  @ApiProperty({
    required: false,
    description:
      '해당 시간 이후의 채팅들을 조회한다. 값이 없을 시, 모든 채팅 조회',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  afterDate: Date;
}
