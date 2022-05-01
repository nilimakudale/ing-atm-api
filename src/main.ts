import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Enable CORS
  app.enableCors();

  //Swagger API documentation configuration
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
  const PORT = parseInt(process.env.PORT) || 3000;
  await app.listen(PORT, ()=>{console.log("Running on port",PORT)});
}
bootstrap();
