import { Inject, Injectable } from '@nestjs/common';
import { ClsLogger } from './cls-logger.logger';

@Injectable()
export class ServiceLogger {
    @Inject()
    private readonly logger: ClsLogger;
}
