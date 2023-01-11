import { ExecutionContext } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt";
import { UploadFiles } from "./UploadFiles";
type OperationType = '*' | '+' | "/" | "-";

class Helpers {
    public static checkIfPromotion(start: Date, end: Date): boolean {
        const currentTime: Date = new Date();
        return new Date(start) < currentTime && new Date(end) > currentTime
    }

    public static getIdFromToken(context: ExecutionContext) {
        const jwt: JwtService = new JwtService();
        const token: string = context.switchToHttp().getRequest().cookies.authToken;
        const decode = jwt.decode(token)
        if (!token || !decode) return false;
        return decode['sub'];
    }

    public static calculate(array: any, targetValue: string, operationType: OperationType): number {
        return array.reduce((accumulator: number, current: object) => {
            if (operationType === "+") return accumulator + current[targetValue]
            else if (operationType === "-") return accumulator - current[targetValue];
            else if (operationType === "*") return accumulator * current[targetValue];
            else return accumulator / current[targetValue];
        }, 0)
    }

    public removeImagesHandle(gallery: string[], images: string[]): string[] {
        const uploadedFile = new UploadFiles()
        images.forEach((image: string) => {
            uploadedFile.unlinkFile({ files: images, filePath: image, fileDest: '/uploads/' })
        })
        return gallery.filter((img: string) => !images.includes(img))
    }
}

export default Helpers;