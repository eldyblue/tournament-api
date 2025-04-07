import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TournamentsModule } from './tournaments/tournaments.module';
import { StagesModule } from './stages/stages.module';
import { PhasesModule } from './phases/phases.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { AuthModule } from './auth/auth.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [TournamentsModule, StagesModule, PhasesModule, UsersModule, TeamsModule, AuthModule, MatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
