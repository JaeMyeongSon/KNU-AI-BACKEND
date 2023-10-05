import { Chat } from '../../entities/chat';

export class ChatDto {
  static fromSchema(chat: Chat) {
    const chatDto = new ChatDto();

    chatDto.chatbotId = chat.chatbotId;
    chatDto.message = chat.message;
    chatDto.userId = chat.userId;
    chatDto.isUserMessage = chat.isUserMessage;
    chatDto.insertedAt = chat.createdAt;

    return chatDto;
  }

  static createForm(request: {
    chatbotId: number;
    userId: number;
    message: string;
    isUserMessage: boolean;
  }) {
    const { chatbotId, userId, message, isUserMessage } = request;

    const chatDto = new ChatDto();

    chatDto.userId = userId;
    chatDto.chatbotId = chatbotId;
    chatDto.message = message;
    chatDto.isUserMessage = isUserMessage;

    return chatDto;
  }

  chatbotId: number;

  userId: number;

  isUserMessage: boolean;

  message: string;

  insertedAt: Date;
}
