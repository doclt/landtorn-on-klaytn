import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'data') })],
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule {}
