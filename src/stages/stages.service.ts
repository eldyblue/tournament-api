import { Injectable } from '@nestjs/common';
import { Prisma, Stage, StageType } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StagesService {

    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<Stage[]> {
        return await this.prisma.stage.findMany()
    }

    async findOne(id: string): Promise<Stage | null> {
        return await this.prisma.stage.findFirst({
            where: {
                id
            }
        })
    }

    async create(data: Prisma.StageCreateInput): Promise<Stage> {
        return this.prisma.stage.create({
            data
        })
    }

    async delete(id: string): Promise<Stage | PrismaClientKnownRequestError> {
        try {
            return await this.prisma.stage.delete({
                where: {
                    id
                }
            })
        } catch (e) {
            return e
        }
    }

    generateStage(type: StageType, contendersCount: number): Prisma.StageCreateWithoutTournamentInput {

        const stageCreateInput: Prisma.StageCreateWithoutTournamentInput = {
            name: "Final Stage",
            type: type,
            format: "test",
            status: "unstarted",
            number_contenders: contendersCount
        }

        return stageCreateInput
    }
}
