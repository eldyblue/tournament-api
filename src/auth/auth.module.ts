import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UsersModule, 
    JwtModule.register({
    global: true, 
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' }
  }), 
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy, UsersService, JwtStrategy],
})
export class AuthModule {}
