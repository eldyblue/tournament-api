import { Injectable } from '@nestjs/common';
import { FinalStageFormat, Phase, Prisma, Stage, StageType } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PhasesService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<Phase[]> {
        return await this.prisma.phase.findMany()
    }

    async findOne(id: string): Promise<Phase | null> {
        return await this.prisma.phase.findFirst({
            where: {
                id
            }
        })
    }

    async create(data: Prisma.PhaseCreateInput): Promise<Phase> {
        return this.prisma.phase.create({
            data
        })
    }

    async delete(id: string): Promise<Phase | PrismaClientKnownRequestError> {
        try {
            return await this.prisma.phase.delete({
                where: {
                    id
                }
            })
        } catch (e) {
            return e
        }
    }

    async generatePhases(stage: Stage, contendersCount: number): Promise<Array<Prisma.PhaseCreateManyInput>> {
        try {
            let phases: Prisma.PhaseCreateManyInput[] = []

            if (stage.type === StageType.FINAL_STAGE) {
                let contenders = contendersCount
                while (contenders >= 2) {
                    const phase: Prisma.PhaseCreateManyInput = {
                        name: this.getRoundName(contenders),
                        type: "test",
                        format: "test",
                        status: "unstarted",
                        number_contenders: contenders,
                        stageId: stage.id
                    }
                    phases.push(phase)
                    contenders /= 2
                }
    
                if (stage.format === FinalStageFormat.DOUBLE_ELIMINATION) {
                    let loserPhaseIndex: number = 1;
                    let losersPhaseNumber: number = contendersCount / 2;
    
                    while (losersPhaseNumber > 1) {
                        const phase: Prisma.PhaseCreateManyInput = {
                            name: `Losers round ${loserPhaseIndex}`,
                            type: "LOSER",
                            format: loserPhaseIndex % 2 === 1 ? "ODD" : "PAIR",
                            status: "unstarted",
                            number_contenders: losersPhaseNumber,
                            stageId: stage.id
                        }
                        phases.push(phase)
    
                        if (loserPhaseIndex % 2 === 0) {
                            losersPhaseNumber /= 2
                        }
                        loserPhaseIndex++
                    }
                }
            }
            return phases;
        } catch (e) {
            throw e
        }
    }

    private getRoundName(contenders: number): string {
        switch (contenders) {
            case 2:
                return 'Final';
            case 4:
                return 'Semi Final';
            case 8:
                return 'Quarter Final';
            case 16:
                return 'Round of 16';
            case 32:
                return 'Round of 32';
            case 64:
                return 'Round of 64';
            case 128:
                return 'Round of 128';
            default:
                return `Round of ${contenders}`;
        }
    }

}
