import { Injectable, Logger } from '@nestjs/common';
import { ClsLogger } from './cls-logger.logger';

@Injectable()
export class AppService {
  constructor(private readonly logger: ClsLogger){}

  private readonly HELLO_WORLD = `
  <!DOCTYPE html>
<html>
<head>
  <title>Hello World</title>
  <style>
    body {
      background-color: #000000;
      color: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
    }

    h1 {
      color: #ffffff;
      font-size: 2.5em;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
  `;

  async getHello(): Promise<string> {
    Logger.log('Hello');
    this.logger.debug('World')
    return '';
  }

  delay = (ms) => new Promise((res) => setTimeout(res, ms));
}
