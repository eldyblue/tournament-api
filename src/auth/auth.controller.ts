import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Prisma, User } from '@prisma/client';
import { ApiBasicAuth, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from './dto/Register.dto';
import { LoginDto } from './dto/Login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({
        type: [LoginDto]
    })
    login(@Request() req) {
        return this.authService.login(req.user)
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    @ApiBearerAuth()
    getUserInfo(@Request() request) {
        return request.user
    }
}
