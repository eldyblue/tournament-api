import { Prisma } from '@prisma/client';
import { TeamsService } from './teams.service';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('teams')
export class TeamsController {
    constructor(private teamsService: TeamsService) {}

    @Get()
    async findAll() {
        return this.teamsService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const team = await this.teamsService.findOne(id)
        if (!team) {
            throw new NotFoundException
        }
        return team
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async create(@Body() postData: {
        name: string, 
        size: number,
        userId: string,
    }) {
        let team: Prisma.TeamCreateInput
        team = {
            name: postData.name,
            size: postData.size,
            members: {
                create: {
                    status: "accepted",
                    userId: postData.userId
                }
            }
        }
        const newTeam = await this.teamsService.create(team)

        if (newTeam instanceof PrismaClientKnownRequestError) {
            return new HttpException('Please verify that your userId is valid.', HttpStatus.BAD_REQUEST)
        }

        return newTeam
    }

    @Post('/addUser')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async addUser(@Body() data: {
        teamId: string,
        userId: string
    }) {
        const result = await this.teamsService.addUser(data.teamId, data.userId)
        if (result instanceof PrismaClientKnownRequestError) {
            throw new HttpException('Please verify your ids and make sure the user is not already in the team', HttpStatus.BAD_REQUEST)
        }
        return result
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async delete(@Param('id') id: string) {
        const team = await this.teamsService.delete(id)
        if (team instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException
        }
        return team
    }

    @Delete('/member/:id')
    @UseGuards(JwtAuthGuard)
    async deleteMember(@Param('id') id: string) {
        const member = await this.teamsService.deleteMember(id)
        if (member instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException
        }
        return member
    }
}
