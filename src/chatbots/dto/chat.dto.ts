import { Chat } from '../../schemas/chat.schema';

export class ChatDto {
  static fromSchema(chat: Chat & { id?: any; createdAt?: any }) {
    const chatDto = new ChatDto();

    chatDto.chatbotId = chat.chatbot.id.toString();
    chatDto.message = chat.message;
    chatDto.userId = 'temp';
    chatDto.isUserMessage = chat.isUserMessage;
    chatDto.insertedAt = chat.createdAt;

    return chatDto;
  }

  chatbotId: string;

  userId: string;

  isUserMessage: boolean;

  message: string;

  insertedAt: Date;
}
