import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
/**
 * ? Create Class constructor type
 */
interface ClassConstructor {
    new(...args: any[]): {}
}

/**
 * 
 * ? Create a custom decorator for handling with SerializeInterceptor
 */
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((response: any) => {
                /**
                 * ! When using pagination, response is a Pagination object. Need a check whether data propety exist in reponse object
                 */

                return plainToInstance(this.dto, response.data ? response : response, {
                    excludeExtraneousValues: true,
                    /* enableImplicitConversion: true ENABLE RELATIONS */
                    enableImplicitConversion: true
                })
            })
        );
    }
}