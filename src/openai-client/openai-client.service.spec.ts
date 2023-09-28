import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiClientService } from './openai-client.service';

describe('OpenaiClientService', () => {
  let service: OpenaiClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenaiClientService],
    }).compile();

    service = module.get<OpenaiClientService>(OpenaiClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
