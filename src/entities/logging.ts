import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Logging {
  @Prop()
  level: string;

  @Prop({ required: true }) //to specify relation to another model
  message: string;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  timestamp: Date;
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const LoggingSchema = SchemaFactory.createForClass(Logging);
