import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClsLogger } from './cls-logger.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = await app.resolve(ClsLogger);
  app.useLogger(logger);

  await app.listen(3000);
}
bootstrap();
