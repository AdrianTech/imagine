import { IsString, Length, IsEnum, IsEmail } from "class-validator";

export class LoginUserDto {
    @Length(6, 30)
    password: string;

    @IsEmail()
    email: string;
}