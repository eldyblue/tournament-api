import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsService } from './tournaments.service';
import { StagesService } from 'src/stages/stages.service';
import { PhasesService } from 'src/phases/phases.service';

describe('TournamentsService', () => {
  let service: TournamentsService;
  let stagesService: StagesService;
  let phasesService: PhasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentsService, StagesService, PhasesService],
    }).compile();

    service = module.get<TournamentsService>(TournamentsService);
    stagesService = module.get<StagesService>(StagesService);
    phasesService = module.get<PhasesService>(PhasesService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
