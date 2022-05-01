import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}


export class UpdateUserDto {
    readonly name: string;
    @IsEmail()
    readonly email: string;
    @MinLength(6)
    readonly password: string;
}





