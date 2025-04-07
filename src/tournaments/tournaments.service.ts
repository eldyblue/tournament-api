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
            }
        })
    }

    async create(data: CreateTournamentDto): Promise<Tournament | PrismaClientKnownRequestError> {

        const { preliminaryStageType, finalStageFormat, preliminaryStageContenders, finalStageContenders, userId, ...tournamentData } = data

        if (!Object.values(FinalStageFormat).includes(finalStageFormat as FinalStageFormat)) {
            throw new BadRequestException('Invalid final stage format');
        }

        const finalStageCreateInput: Prisma.StageCreateWithoutTournamentInput = {
            name: "Final Stage",
            type: StageType.FINAL_STAGE,
            format: finalStageFormat,
            status: "unstarted",
            number_contenders: finalStageContenders
        }

        let stages: Prisma.StageCreateManyTournamentInput = {
            ...finalStageCreateInput
        }

        // Handle preliminary stage.
        if (preliminaryStageType) {
            if (!Object.values(StageType).includes(preliminaryStageType as StageType)) {
                throw new BadRequestException('Invalid stage type');
            }

            const preliminaryStageCreateInput: Prisma.StageCreateWithoutTournamentInput = {
                name: preliminaryStageType?.toString() as string,
                type: preliminaryStageType as string,
                format: "test",
                status: "unstarted",
                number_contenders: preliminaryStageContenders as number
            }

            stages = {
                ...stages,
                ...preliminaryStageCreateInput
            }
        }

        const tournamentCreateInput: Prisma.TournamentCreateInput = {
            ...tournamentData,
            owner: { connect: { id: userId } },
            stages: { 
                createMany: {
                    data: stages
                }
            }
        }

        return this.prisma.tournament.create({
            data: tournamentCreateInput
        })
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
