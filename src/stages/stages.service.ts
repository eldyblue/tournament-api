import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FinalStageFormat, Prisma, Stage, StageType } from '@prisma/client';
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

    async generateStage(type: StageType, format: FinalStageFormat, contendersCount: number): Promise<Prisma.StageCreateWithoutTournamentInput> {
        switch (type) {
            case StageType.FINAL_STAGE: 
                const stageCreateInput: Prisma.StageCreateWithoutTournamentInput = {
                    name: "Final Stage",
                    type: type,
                    format: format,
                    status: "unstarted",
                    number_contenders: contendersCount
                }
                return stageCreateInput
            default: 
                throw new HttpException('Unhandled stage type', HttpStatus.BAD_REQUEST)
        }
    }
}
