import { ChatbotDto } from './chatbot.dto';

export class GetChatbotsResponseDto {
  constructor(chatbots: ChatbotDto[]) {
    this.chatbots = chatbots;
  }

  chatbots: ChatbotDto[];
}
