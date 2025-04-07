import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(id)
        if (!user) {
            throw NotFoundException
        }
        return user
    }

    @Post()
    async create(@Body() postData: {
        username: string,
        email: string,
        password: string,
        bio: string,
        country: string,
    }) {
        let user: Prisma.UserCreateInput
        user = postData
        const newUser = await this.usersService.create(user)
        if (!newUser) {
            return 'something went wrong'
        }
        return newUser
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const user = await this.usersService.delete(id)
        if (user instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException
        }
        return user
    }
}
