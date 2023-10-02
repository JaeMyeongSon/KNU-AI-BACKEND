import { ChatDocument } from '../../schemas/chat.schema';

export class ChatDto {
  static fromSchema(chat: ChatDocument) {
    const chatDto = new ChatDto();

    chatDto.chatbotId = chat.chatbotId.toString();
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
