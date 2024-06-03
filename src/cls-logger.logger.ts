import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Inject,
  Injectable,
  Optional,
  Scope,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CLS_REQ, ClsService } from 'nestjs-cls';

@Injectable({ scope: Scope.TRANSIENT })
export class ClsLogger extends ConsoleLogger {
  @Inject()
  private readonly cls: ClsService;

  /**
   * @param parameter The desired parameter from the Cls context
   * @returns The obtained parameter or undefined
   */
  private getClsParameter(parameter: string): string | undefined {
    const req = this.cls.get(CLS_REQ);
    let result: string;
    try {
      result = req.get(parameter);
    } catch (error) {
      return undefined;
    }
    return result;
  }

  /**
   * Builds a message body appended with requestId and eventId
   */
  private body(message: string | unknown): object {
    return {
      message,
      requestId: this.getClsParameter('x-request-id'),
      eventId: this.cls.getId(),
    };
  }

  /**
   * Write a 'log' level log, if the configured level allows for it.
   * Prints to `stdout` with newline.
   */
  log(message: any, context?: string): void {
    if (context) super.log(JSON.stringify(this.body(message)), context);
    else super.log(JSON.stringify(this.body(message)));
  }

  /**
   * Write a 'debug' level log, if the configured level allows for it.
   * Prints to `stdout` with newline.
   */
  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: any[]): void;
  debug(message: unknown, context?: unknown, ...rest: unknown[]): void {
    if (context) super.debug(JSON.stringify(this.body(message)), context);
    else super.debug(JSON.stringify(this.body(message)));
  }

  /**
   * Write a 'warn' level log, if the configured level allows for it.
   * Prints to `stdout` with newline.
   */
  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: any[]): void;
  warn(message: unknown, context?: unknown, ...rest: unknown[]): void {
    super.warn(JSON.stringify(this.body(message)), context);
  }

  /**
   * Write a 'error' level log, if the configured level allows for it.
   * Prints to `stdout` with newline.
   */
  error(message: any, stackOrContext?: string): void;
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(
    message: unknown,
    stack?: unknown,
    context?: unknown,
    ...rest: unknown[]
  ): void {
    super.error(JSON.stringify(this.body(message)), context);
  }

  /**
   * Write a 'verbose' level log, if the configured level allows for it.
   * Prints to `stdout` with newline.
   */
  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: any[]): void;
  verbose(message: unknown, context?: unknown, ...rest: unknown[]): void {
    super.verbose(JSON.stringify(this.body(message)), context);
  }

  /**
   * Write a 'fatal' level log, if the configured level allows for it.
   * Prints to `stdout` with newline.
   */
  fatal(message: any, context?: string): void;
  fatal(message: any, ...optionalParams: any[]): void;
  fatal(message: unknown, context?: unknown, ...rest: unknown[]): void {
    super.fatal(JSON.stringify(this.body(message)), context);
  }
}
