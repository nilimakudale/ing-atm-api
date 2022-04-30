import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('ING ATMs APIs')
    .setDescription('CRUD APIs')
    .setVersion('1.0')
    .addTag('ING ATMs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // handle all user input validation globally
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
