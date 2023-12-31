import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { HttpExceptionFilter } from './httpException.filter';
import { LoggingService } from './logging/logging.service';

declare const module: any;

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  //   bufferLogs: true,
  // });
  //app.useLogger(app.get(LoggingService)); // 초기 부팅시 출력되는 로그 변경시
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const port = process.env.PORT || 8080;

  const config = new DocumentBuilder()
    .setTitle('KNU AI')
    .setDescription('KNU AI 서비스의 API Documents입니다.')
    .setVersion('1.0')
    .addTag('KNU AI')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.use(
    session({
      saveUninitialized: false,
      resave: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  );
  app.useWebSocketAdapter(new IoAdapter(app));
  const logger = app.get<LoggingService>(LoggingService); //커스텀 로거 등록
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
