import { Injectable, NotFoundException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany()
    }

    async findOne(id: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: {
                id
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: {
                email
            }
        })
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data
        })
    }

    async delete(id: string): Promise<User | PrismaClientKnownRequestError> {
        try {
            return await this.prisma.user.delete({
                where: {
                    id
                }
            })
        } catch (e) {
            return e
        }
    }
}
