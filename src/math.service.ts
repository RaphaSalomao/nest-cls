import { Injectable } from '@nestjs/common';
import { ClsLogger } from './cls-logger.logger';

@Injectable()
export class Math {
  constructor(private readonly logger: ClsLogger) {}
  sum(n1: number, n2: number): number {
    const n3 = n1 + n2;
    this.logger.log(`Operation: ${n1} + ${n2} = ${n3}`);
    return n3;
  }
}
