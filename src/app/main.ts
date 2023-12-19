import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from '../config/configuration';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as cookie from 'cookie-parser';

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

  await app.listen(port);
}
bootstrap().then(() => {
  const logger = new Logger('Bootstrap');
  logger.log(
    `Application started on port: ${port} in ${process.env.NODE_ENV} mode, PID: ${process.pid}`,
  );
});
