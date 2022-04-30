import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class IngATM extends Model<IngATM> {
       @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
}
