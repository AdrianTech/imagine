import { BadRequestException, ConflictException, ExceptionFilter, NotFoundException } from "@nestjs/common";

const dbErrorHandler = (code: string): ExceptionFilter => {
    switch (+code) {
        case 23505:
            throw new ConflictException("Ten email już istnieje")
        case 404:
            throw new NotFoundException()
        default: throw new BadRequestException("Coś poszło nie tak")
    }
}

export default dbErrorHandler;