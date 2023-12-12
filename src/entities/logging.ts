import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type LoggingDocument = Logging & Document;

@Schema({ timestamps: { createdAt: 'timestamp', updatedAt: false } })
export class Logging {
  @Prop()
  level: string;

  @Prop({ required: true }) //to specify relation to another model
  message: string;
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
const schema = SchemaFactory.createForClass(Logging);
schema.plugin(mongoosePaginate);
schema.index({ timestamp: -1 });
export const LoggingSchema = schema;
