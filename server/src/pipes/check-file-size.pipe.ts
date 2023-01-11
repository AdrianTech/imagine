import { Injectable, PipeTransform, HttpException, HttpStatus, UnsupportedMediaTypeException } from '@nestjs/common';

@Injectable()
export class CheckFileSizePipe implements PipeTransform {
  constructor(public fileSize: number) { }
  transform(files: any) {

    if (!files) throw new UnsupportedMediaTypeException();

    files.forEach((file: any) => {
      const megabates: string = (file.size / (1024 * 1024)).toFixed(2)
      if (+megabates > this.fileSize) throw new HttpException({
        status: HttpStatus.NOT_ACCEPTABLE,
        error: 'Zbyt duży plik'
      }, HttpStatus.NOT_ACCEPTABLE)
    });

    return files;
  }
}
