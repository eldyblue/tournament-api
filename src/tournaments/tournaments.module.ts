import { Module } from '@nestjs/common';
import { PhasesModule } from 'src/phases/phases.module';
import { StagesModule } from 'src/stages/stages.module';
import { TeamsModule } from 'src/teams/teams.module';
import { UsersModule } from 'src/users/users.module';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [StagesModule, PhasesModule, UsersModule, TeamsModule],
    controllers: [TournamentsController],
    providers: [TournamentsService, PrismaService],
})
export class TournamentsModule {}
