import { OpenaiMessageRole } from '../openai-message-role';

export class OpenaiMessageDto {
  role: OpenaiMessageRole;
  content: string;

  constructor(role: OpenaiMessageRole, content: string) {
    this.role = role;
    this.content = content;
  }
}
