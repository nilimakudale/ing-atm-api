import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { json } from 'sequelize/types';

export class GeoLocation {
    @ApiProperty()
    lat: string;
    @ApiProperty()
    lng: string
}

@Table
export class IngATM extends Model<IngATM> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    street: string;
    @Column({
        type: DataType.STRING,
    })
    city: string;
    @Column({
        type: DataType.JSON,
    })
    geoLocation: GeoLocation;

}

