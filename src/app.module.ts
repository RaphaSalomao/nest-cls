import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClsModule } from 'nestjs-cls';
import { ClsLogger } from './cls-logger.logger';
import { Math } from './math.service';
import { ServiceLogger } from './service-logger.service';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        generateId: true,
        idGenerator(req) {
          return randomUUID();
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ClsLogger, Math, ServiceLogger ],
})
export class AppModule {}
