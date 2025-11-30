import { PipeTransform } from '@nestjs/common';

export class UppperCasePipe implements PipeTransform {
  transform(value: string) {
    return value.toUpperCase();
  }
}
