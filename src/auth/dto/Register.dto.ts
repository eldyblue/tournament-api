import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterDto {

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    avatar: string;

    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @IsOptional()
    country: string;
}