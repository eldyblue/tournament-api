import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateTournamentDto } from './dto/CreateTournament.dto';

@Controller('tournaments')
export class TournamentsController {
    constructor(private tournamentsService: TournamentsService) {}
    
    @Get()
    async findAll() {
        return this.tournamentsService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.tournamentsService.findOne(id)
        if (!result) {
            throw NotFoundException
        }
        return result
    }

    @Post()
    async create(@Body() postData: CreateTournamentDto) {
        const result = await this.tournamentsService.create(postData)
        if (result instanceof PrismaClientKnownRequestError) {
            return new NotFoundException
        }
        return result
    }

    @Post('/addStaff')
    async addStaff(@Body() postData: {
        tournamentId: string,
        userId: string
    }) {
        const result = await this.tournamentsService.addStaff(postData.tournamentId, postData.userId)
        if (result instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException
        }
        return result
    }

    @Post('/addContender')
    async addContender(@Body() postData: {
        tournamentId: string,
        contenderId: string,
        asTeam: boolean
    }) {
        const result = await this.tournamentsService.addContender(postData.tournamentId, postData.contenderId, postData.asTeam)
        if (result instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException
        }
        return result
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const result = await this.tournamentsService.delete(id)
        if (result instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException
        }
        return result
    }
}
