import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('coinc-ms-bankaccounts API')
    .setDescription(
      'This is a documentation for the CoinC Bank Accounts microsservice',
    )
    .setVersion('1.0')
    .addServer('/dev/', 'Development environment')
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'JWT Auth Token',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
};
