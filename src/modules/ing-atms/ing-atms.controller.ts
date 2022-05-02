import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Logger, LoggerService, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { IngATMsService } from './ing-atms.service';
import { IngATM as IngATMEntity } from './ing-atm.entity';
import { IngATMDto } from './dto/ing-atm.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('ING ATMs CRUD')

@Controller('ingATMs')
export class IngATMsController {
    constructor(
        @Inject(Logger) private readonly logger: LoggerService,
        private readonly ingATMsService: IngATMsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiBearerAuth('access-token')
    @ApiOkResponse({ description: 'Fetched records successfully' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async findAll() {
        this.logger.log(`In findAllATMs()...`);
        try {
            // get atm list 
            const atmList = await this.ingATMsService.findAll();
            return atmList;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }


    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBearerAuth('access-token')
    @ApiCreatedResponse({ description: 'New ATM record added' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async create(@Body() ingATM: IngATMDto): Promise<IngATMEntity> {
        this.logger.log(`In createATM()...`);
        try {
            // create a new ATM record
            return await this.ingATMsService.create(ingATM);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiBearerAuth('access-token')
    @ApiOkResponse({ description: 'Updated record successfully' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async update(@Param('id') id: number, @Body() ingATM: IngATMDto): Promise<IngATMEntity> {
        this.logger.log(`In updateATM()...id=${id}`);
        try {
            // get the updated ATM record
            const { updatedATM } = await this.ingATMsService.update(id, ingATM);
            // return the updated ATM data
            return updatedATM;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @ApiBearerAuth('access-token')
    @ApiOkResponse({ description: 'Deleted record successfully' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Access' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async remove(@Param('id') id: number) {
        this.logger.log(`In removeATM()...id=${id}`);
        try {
            // delete the ATM with this id
            const deleted = await this.ingATMsService.delete(id);
            // if the number of row affected is zero, then the ATM doesn't exist in our db
            if (deleted === 0) {
                throw new NotFoundException('This ATM doesn\'t exist');
            }
            // return success message
            return 'Successfully deleted';
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
