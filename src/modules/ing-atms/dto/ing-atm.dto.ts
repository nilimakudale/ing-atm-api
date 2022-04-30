import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { json } from 'sequelize/types';
import { GeoLocation } from '../ing-atm.entity';

export class IngATMDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @MinLength(4)
    name: string;
    @ApiProperty({ type: String, required: false })
    street: string;
    @ApiProperty({ type: String, required: false })
    city: string;
    @ApiProperty({required:false})
    geoLocation: GeoLocation;
}


