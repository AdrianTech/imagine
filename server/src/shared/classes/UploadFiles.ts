import { join, extname } from 'path';
import { v4 as uuid } from 'uuid';
import { existsSync, mkdirSync, writeFileSync, unlinkSync, fstat } from 'fs';
import { NotFoundException, UnsupportedMediaTypeException } from '@nestjs/common';


interface Setup {
    path: string,
    files?: any[],
    // file?: object
}
//|| !Object.keys(this.setup.file).length

interface FileSetup {
    files: any[]
    filePath?: string
    fileDest: string
}

export class UploadFiles {

    public unlinkFile(setup: FileSetup) {
        const test = setup.files.forEach((file: string) => {

            if (file === setup.filePath && existsSync(join(__dirname, '../../..', `${setup.fileDest}`))) {
                unlinkSync(join(__dirname, '../../..', `${setup.fileDest}/${file}`));
            }
        });
    }

    public processFile(setup: FileSetup) {
        if (!setup.files || !setup.fileDest) return;
        if (!existsSync(join(__dirname, '../../..', `${setup.fileDest}`))) {
            mkdirSync(join(__dirname, '../../..', `${setup.fileDest}`));
        }
        return setup.files.map((file: any) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                const ext = extname(file.originalname);
                const newFile = `${uuid()}${ext}`
                const filePath = join(__dirname, '../../..', `${setup.fileDest}${newFile}`);
                writeFileSync(filePath, file.buffer)
                return `${newFile}`;
            }
            throw new UnsupportedMediaTypeException()
        })
    }
}