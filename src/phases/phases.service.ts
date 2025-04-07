import { Injectable } from '@nestjs/common';
import { Phase, Prisma, StageType } from '@prisma/client';
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

    generatePhases(stageType: StageType, contendersCount: number): Array<Prisma.PhaseCreateWithoutStageInput> {
        let phases: Prisma.PhaseCreateWithoutStageInput[] = []

        if (stageType === StageType.FINAL_STAGE) {
            let contenders = contendersCount
            while (contenders >= 2) {
                const phase: Prisma.PhaseCreateWithoutStageInput = {
                    name: this.getRoundName(contenders),
                    type: "test",
                    format: "test",
                    status: "unstarted",
                    number_contenders: contenders,
                }
                phases.push(phase)
                contenders / 2
            }
        }
        return phases;
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
