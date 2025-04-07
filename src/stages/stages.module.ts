import { Module } from '@nestjs/common';
import { PhasesModule } from 'src/phases/phases.module';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [PhasesModule],
    controllers: [StagesController],
    providers: [StagesService, PrismaService]
})
export class StagesModule {}
