import { INestApplication, RequestMethod, VersioningType } from '@nestjs/common'
import * as dotenv from 'dotenv'
dotenv.config()
export const ACCOUNT_IMPLEMENTATION = process.env.ACCOUNT_IMPLEMENTATION || ''
export const RPC_URL = process.env.RPC_URL || ''
export const TORN_ADDRESS = process.env.TORN_ADDRESS || ''
export const SPOIL_ADDRESS = process.env.SPOIL_ADDRESS || ''
export const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
export const PAYER_KEY = process.env.PAYER_KEY || ''
export const DUNGEON_VERSION = Number(process.env.DUNGEON_VERSION || '1')
export const SHARD_ADDRESS = process.env.SHARD_ADDRESS || ''
export const HOST_URL = process.env.HOST_URL || ''
export const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS || ''

export function setAppSetting(app: INestApplication) {
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }]
  })
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3004',
      'http://localhost:3005',
      'http://localhost:3006',
      'http://localhost:3007',
      'https://landtorn.com',

      /\.landtorn.com$/
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
}
