import { BadRequestException, Injectable } from '@nestjs/common';
import { Contender, Prisma, Staff, Tournament, ContenderType, StageType, FinalStageFormat } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { title } from 'process';
import { PrismaService } from 'src/prisma.service';
import { CreateTournamentDto } from './dto/CreateTournament.dto';
import { StagesService } from 'src/stages/stages.service';
import { PhasesService } from 'src/phases/phases.service';

@Injectable()
export class TournamentsService {

    constructor(
        private prisma: PrismaService,
        private stagesService: StagesService,
        private phasesService: PhasesService
    ) { }

    async findAll(): Promise<Tournament[]> {
        return await this.prisma.tournament.findMany()
    }

    async findOne(id: string): Promise<Tournament | null> {
        return await this.prisma.tournament.findFirst({
            where: {
                id
            },
            include: {
                stages: {
                    include: {
                        phases: true
                    }
                }
            }
        })
    }

    async create(data: CreateTournamentDto): Promise<Tournament | Error> {

        try {
            const {finalStageFormat, finalStageContenders, userId, ...tournamentData } = data

            const finalStageInput: Prisma.StageCreateWithoutTournamentInput = await this.stagesService.generateStage(StageType.FINAL_STAGE, finalStageFormat, finalStageContenders)
    
            const tournamentCreateInput: Prisma.TournamentCreateInput = {
                ...tournamentData,
                owner: { connect: { id: userId } }
            }
    
            const tournament = await this.prisma.tournament.create({
                data: tournamentCreateInput
            })
    
            const stage = await this.prisma.stage.create({
                data: {
                    ...finalStageInput,
                    tournamentId: tournament.id
                }
            })
    
            const phasesInput: Prisma.PhaseCreateManyInput[] = await this.phasesService.generatePhases(stage, finalStageContenders)
    
            const phases = await this.prisma.phase.createMany({
                data: phasesInput
            })
    
            return tournament
        } catch (err) {
            return err
        }
    }

    async addStaff(tournamentId: string, userId: string): Promise<Staff | PrismaClientKnownRequestError> {
        try {
            return await this.prisma.staff.create({
                data: {
                    tournamentId: tournamentId,
                    userId: userId,
                    status: "accepted"
                }
            })
        } catch (e) {
            return e
        }
    }

    async addContender(tournamentId: string, contenderId: string, asTeam: boolean): Promise<Contender | PrismaClientKnownRequestError> {
        try {
            return await this.prisma.contender.create({
                data: {
                    tournamentId: tournamentId,
                    contenderId: contenderId,
                    status: "accepted",
                    contenderType: asTeam ? ContenderType.TEAM : ContenderType.USER
                }
            })
        } catch (e) {
            return e
        }
    }

    async delete(id: string): Promise<Tournament | PrismaClientKnownRequestError> {
        try {
            return await this.prisma.tournament.delete({
                where: {
                    id
                }
            })
        } catch (e) {
            return e
        }
    }
}
