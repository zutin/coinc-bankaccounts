import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerConfig } from './swagger.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const binaryMimeTypes: string[] = [];

let cachedServer: Server;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function bootstrapServer(module: any, event: any, context: any) {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      module,
      new ExpressAdapter(expressApp),
    );
    nestApp.enableCors();
    SwaggerConfig(nestApp);
    nestApp.use(eventContext());
    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
