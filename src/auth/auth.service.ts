import { UsersService } from './../users/users.service';
import { Prisma, User } from '@prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, plainPassword: string): Promise<any> {
        const user = await this.usersService.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        const isPasswordValid = await bcrypt.compare(plainPassword, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password incorrect')
        }

        const { password, ...result } = user

        return result
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email }
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: Prisma.UserCreateInput) {
        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await this.usersService.create({
            ...data,
            password: hashedPassword,
        })

        return user
    }
}
