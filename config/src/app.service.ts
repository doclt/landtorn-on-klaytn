import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  root() {
    return 'Config Soul API'
  }
  health(): string {
    return 'OK'
  }
}
