import { IsString, Length, IsEnum, IsEmail } from "class-validator";
import { ROLES } from "../../shared/variables/enums";
import { Exclude, Expose } from "class-transformer";

export class CreateUserDto {
    @IsString()
    @Length(3, 40, { message: 'Nazwa musi zabierać min 3 znaki. Max 40.' })
    @Expose()
    username: string;
    @IsEnum(ROLES)
    @Expose()
    role: ROLES

    @IsEmail({ unique: true })
    @Expose()
    email: string;

    @IsString()
    @Exclude()
    @Length(6, 50, { message: "Hasło powinno mieć co najmniej 6 znaków" })
    password: string;

    @Expose()
    products: any;

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
    }
}
