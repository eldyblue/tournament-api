import { FinalStageFormat, StageType, TournamentFormat, TournamentStatus } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateTournamentDto {
    @IsString()
    title: string

    @IsString()
    image: string | null

    @IsString()
    description: string | null

    format: TournamentFormat

    status: TournamentStatus

    preliminaryStageType: StageType | null

    preliminaryStageContenders: number | null

    finalStageFormat: FinalStageFormat

    @IsNumber()
    finalStageContenders: number

    @IsString()
    userId: string
}