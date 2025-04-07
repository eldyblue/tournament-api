import { Injectable } from '@nestjs/common';
import { Member, Prisma, Team } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamsService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Team[] | null> {
        return this.prisma.team.findMany()
    }

    async findOne(id: string): Promise<Team | null> {
        return this.prisma.team.findFirst({
            where: {
                id
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                }
            }
        })
    }

    async create(data: Prisma.TeamCreateInput): Promise<Team | PrismaClientKnownRequestError> {
        try {
            return await this.prisma.team.create({
                data
            })
        } catch (e) {
            return e
        }
    }

    async addUser(teamId: string, userId: string): Promise<Member | PrismaClientKnownRequestError> {
        try {
            return await this.prisma.member.create({
                data: {
                    teamId: teamId,
                    userId: userId,
                    status: 'accepted'
                }
            })
        } catch (e) {
            return e
        }
    }

    async delete(id: string): Promise<Team | PrismaClientKnownRequestError> {
        try {
            return await this.prisma.team.delete({
                where: {
                    id
                }
            })
        } catch (e) {
            return e
        }
    }
}
