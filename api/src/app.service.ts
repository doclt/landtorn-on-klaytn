import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  root() {
    return 'Landtorn Soul API'
  }
  health(): string {
    return 'OK'
  }
}
