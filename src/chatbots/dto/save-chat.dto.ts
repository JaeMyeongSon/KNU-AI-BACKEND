export class SaveChatDto {
  constructor(
    public chatbotId: string,
    public userId: string,
    public message: string,
    public isUserMessage: boolean,
  ) {}
}
