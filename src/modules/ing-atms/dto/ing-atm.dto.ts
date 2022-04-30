import { IsNotEmpty, MinLength } from 'class-validator';

export class IngATMDto {

    @IsNotEmpty()
    @MinLength(4)
    readonly name: string;

  
}
