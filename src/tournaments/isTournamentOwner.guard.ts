import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IsTournamentOwnerGuard implements CanActivate {
    constructor(
        private prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const tournamentId = request.params.id;

        if (!tournamentId || !user) {
            throw new ForbiddenException('Unauthorized');
        }

        const tournament = await this.prisma.tournament.findUnique({
            where: { id: tournamentId },
            select: { ownerId: true },
        });

        if (!tournament) {
            throw new ForbiddenException('Tournament not found');
        }

        if (tournament.ownerId !== user.id) {
            throw new ForbiddenException('You are not the owner of this tournament');
        }

        return true;
    }
}
