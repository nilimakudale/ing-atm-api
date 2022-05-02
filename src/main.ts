import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as winston from 'winston';
import { PORT } from './common/constants';
import { WinstonModule } from 'nest-winston';
dotenv.config();

async function bootstrap() {
    
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/logs.log' }),
      ],
    })
  });

  //Enable CORS
  app.enableCors();

  //Swagger API documentation configuration
  const config = new DocumentBuilder()
    .setTitle('ING ATMs APIs')
    .setVersion('1.0')
    .addBearerAuth(
      { 
        description: 'Please enter token',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http', 
        in: 'Header'
      },
      'access-token',
    )
    .addTag('ING ATMs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe());
  const APP_PORT = parseInt(process.env.PORT) || PORT;
  await app.listen(APP_PORT, ()=>{console.log("Running on port",APP_PORT)});

}
bootstrap();
