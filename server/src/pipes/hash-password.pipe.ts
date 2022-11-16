import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  transform(data: any, metadata: ArgumentMetadata) {

    if (data.hasOwnProperty('password')) {
      data.password = bcrypt.hashSync(data.password, 10);
    }
    return data;
  }
}
