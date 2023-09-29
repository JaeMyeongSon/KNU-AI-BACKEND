export class OpenaiMessageDto {
  role: 'system' | 'assistant' | 'user';
  content: string;

  constructor(role: 'system' | 'assistant' | 'user', content: string) {
    this.role = role;
    this.content = content;
  }
}
