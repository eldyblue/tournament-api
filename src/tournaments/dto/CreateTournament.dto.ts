import { FinalStageFormat, StageType, TournamentFormat, TournamentStatus } from "@prisma/client";
import { IsBoolean, IsEnum, IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {
    @IsString()
    title: string

    @IsString()
    @IsOptional()
    image: string | null

    @IsString()
    @IsOptional()
    description: string | null

    @IsEnum(TournamentFormat)
    format: TournamentFormat

    @IsEnum(TournamentStatus)
    status: TournamentStatus

    @IsEnum(FinalStageFormat)
    finalStageFormat: FinalStageFormat    

    @IsNumber()
    @IsIn([128, 64, 32, 16, 8, 4])
    finalStageContenders: number

    @IsBoolean()
    @IsOptional()
    hasSmallFinal: boolean

    @IsString()
    userId: string
}