import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { stringify } from 'yaml';
import * as fs from 'node:fs';

const PORT = config().parsed?.PORT ? config().parsed?.PORT : 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .addServer(`http://localhost:${PORT}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const yalmString: string = stringify(document, {});
  fs.writeFileSync('./doc/api.yalm', yalmString, { encoding: 'utf-8' });
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
