import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { IngATMsService } from './ing-atms.service';
import { IngATM as IngATMEntity } from './ing-atm.entity';
import { IngATMDto } from './dto/ing-atm.dto';

@Controller('ingATMs')
export class IngATMsController {
    constructor(private readonly ingATMsService: IngATMsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll() {
        console.log("findAll");
        // get atm list 
        const atmList = await this.ingATMsService.findAll();
        return atmList;
    }


    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() ingATM: IngATMDto): Promise<IngATMEntity> {
        // create a new ATM record
        return await this.ingATMsService.create(ingATM);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() ingATM: IngATMDto): Promise<IngATMEntity> {
        // get the updated ATM record
        const { updatedATM } = await this.ingATMsService.update(id, ingATM);
        // return the updated ATM data
        return updatedATM;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number) {
        // delete the ATM with this id
        const deleted = await this.ingATMsService.delete(id);

        // if the number of row affected is zero, then the ATM doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This ATM doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
