import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from '../config/configuration';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as cookie from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = configuration().PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    morgan(
      '[:date] :method :url :status :response-time ms - :res[content-length]',
    ),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });
  app.use(cookie());

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Sample Trello API')
    .setDescription('use it for good not evil')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port);
}
bootstrap().then(() => {
  const logger = new Logger('Bootstrap');
  logger.log(
    `Application started on port: ${port} in ${process.env.NODE_ENV} mode, PID: ${process.pid}`,
  );
});
