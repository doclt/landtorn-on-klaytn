import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setAppSetting } from './app.settings'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setAppSetting(app)
  const version = '1.0'
  const config = new DocumentBuilder()
    .setTitle('Lantorn API')
    .setDescription('Lantorn API description')
    .setVersion(version)
    .addBearerAuth()
    // .addSecurityRequirements('bearer')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  const configService = app.get(ConfigService)
  const port = configService.get('APP_PORT')
  await app.listen(port)
  console.log(`app started with ${port}`)
}
bootstrap()
