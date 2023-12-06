import { ApiProperty } from '@nestjs/swagger';

export class PremiumInfoDto {
  constructor(premiumCount: number, userCount: number) {
    this.premiumCount = premiumCount;
    this.userCount = userCount;
  }

  @ApiProperty({
    required: true,
    example: 1000,
    description: '현재 프리미엄에 가입 중인 유저 수',
  })
  premiumCount: number;

  @ApiProperty({
    required: true,
    example: 10000,
    description: '가입된 유저 수',
  })
  userCount: number;
}
