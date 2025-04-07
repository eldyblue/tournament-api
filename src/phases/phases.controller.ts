import { Prisma } from '@prisma/client';
import { PhasesService } from './phases.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('phases')
export class PhasesController {
    constructor(private phasesService: PhasesService) {}
            
    @Get()
    async findAll() {
        return this.phasesService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.phasesService.findOne(id)
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
        stageId: string
    }) {
        let stage: Prisma.PhaseCreateInput
        stage = {
            name: postData.name,
            type: postData.type,
            format: postData.format,
            status: postData.status,
            number_contenders: postData.number_contenders,
            stage: { connect: { id: postData.stageId }},
        }

        const result = await this.phasesService.create(stage)
        if (result instanceof PrismaClientKnownRequestError) {
            return new NotFoundException
        }
        return result
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: string) {
        const result = await this.phasesService.delete(id)
        if (result instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException
        }
        return result
    }
}
