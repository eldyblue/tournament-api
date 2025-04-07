import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user)
    }

    @Post('register')
    async register(@Body() body: Prisma.UserCreateInput) {
        return this.authService.register(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        return request.user
    }
}
