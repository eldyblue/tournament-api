import { Module } from '@nestjs/common';
import { PhasesController } from './phases.controller';
import { PhasesService } from './phases.service';
import { PrismaService } from 'src/prisma.service';
import { MatchesModule } from 'src/matches/matches.module';

@Module({
  imports: [MatchesModule],
  controllers: [PhasesController],
  providers: [PhasesService, PrismaService]
})
export class PhasesModule {}
