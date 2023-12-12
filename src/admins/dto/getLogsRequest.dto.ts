import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GetLogsRequestDto {
  @ApiProperty({
    required: false,
    description: '한 페이지 당 로그 수',
    maximum: 50,
    minimum: 5,
  })
  @IsOptional()
  @Min(5)
  @Max(50)
  @IsNumber()
  limit: number = 10;

  @ApiProperty({
    required: false,
    description: '페이지',
  })
  @IsOptional()
  @Min(1)
  @IsNumber()
  page: number = 1;
}
