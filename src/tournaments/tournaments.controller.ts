import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateTournamentDto } from './dto/CreateTournament.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsTournamentOwnerGuard } from './isTournamentOwner.guard';

@ApiTags('tournaments')
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
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @ApiBearerAuth()
    async create(@Body() postData: CreateTournamentDto) {
        const result = await this.tournamentsService.create(postData)
        if (result instanceof PrismaClientKnownRequestError) {
            return new HttpException('Could not create the tournament, please verify your inputs.', HttpStatus.BAD_REQUEST)
        }
        return result
    }

    @Post('/:id/addStaff')
    @UseGuards(JwtAuthGuard, IsTournamentOwnerGuard)
    @ApiBearerAuth()
    async addStaff(
        @Param('id') tournamentId: string,
        @Body() postData: {
            userId: string  
    }) {
        const result = await this.tournamentsService.addStaff(tournamentId, postData.userId)
        if (result instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException
        }
        return result
    }

    @Post('/:id/addContender')
    @UseGuards(JwtAuthGuard, IsTournamentOwnerGuard)
    @ApiBearerAuth()
    async addContender(
        @Param('id') tournamentId: string,
        @Body() postData: {
            contenderId: string,
            asTeam: boolean
    }) {
        const result = await this.tournamentsService.addContender(tournamentId, postData.contenderId, postData.asTeam)
        if (result instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException
        }
        return result
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, IsTournamentOwnerGuard)
    @ApiBearerAuth()
    async delete(@Param('id') id: string) {
        const result = await this.tournamentsService.delete(id)
        if (result instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException
        }
        return result
    }
}
