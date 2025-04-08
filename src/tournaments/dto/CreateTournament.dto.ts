import { ApiProperty } from "@nestjs/swagger";
import { FinalStageFormat, StageType, TournamentFormat, TournamentStatus } from "@prisma/client";
import { IsBoolean, IsEnum, IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {

    @ApiProperty({ example: 'Winter cup 2025' })
    @IsString()
    title: string

    @IsString()
    @IsOptional()
    image: string | null


    @ApiProperty({ example: 'The description of the tournament'})
    @IsString()
    @IsOptional()
    description: string | null

    @ApiProperty({ enum: TournamentFormat })
    @IsEnum(TournamentFormat)
    format: TournamentFormat

    @ApiProperty({ enum: TournamentStatus })
    @IsEnum(TournamentStatus)
    status: TournamentStatus

    @ApiProperty({ enum: FinalStageFormat })
    @IsEnum(FinalStageFormat)
    finalStageFormat: FinalStageFormat    

    @ApiProperty({
        description: 'Number of player in the final stage', 
        enum: [128, 64, 32, 16, 8, 4]
    })
    @IsNumber()
    @IsIn([128, 64, 32, 16, 8, 4])
    finalStageContenders: number

    @IsBoolean()
    @IsOptional()
    hasSmallFinal: boolean

    @IsString()
    userId: string
}