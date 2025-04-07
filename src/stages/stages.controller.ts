import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { StagesService } from './stages.service';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('stages')
export class StagesController {

    constructor(private stagesService: StagesService) {}
        
    @Get()
    async findAll() {
        return this.stagesService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.stagesService.findOne(id)
        if (!result) {
            throw NotFoundException
        }
        return result
    }

    @Post()
    async create(@Body() postData: {
        name: string,
        type: string,
        format: string,
        status: string,
        number_contenders: number,
        tournamentId: string
    }) {
        let stage: Prisma.StageCreateInput
        stage = {
            name: postData.name,
            type: postData.type,
            format: postData.format,
            status: postData.status,
            number_contenders: postData.number_contenders,
            tournament: { connect: { id: postData.tournamentId }},
        }

        const result = await this.stagesService.create(stage)
        if (result instanceof PrismaClientKnownRequestError) {
            return new NotFoundException
        }
        return result
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const result = await this.stagesService.delete(id)
        if (result instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException
        }
        return result
    }
}
