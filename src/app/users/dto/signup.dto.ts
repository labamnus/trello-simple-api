import { Sex } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @ApiProperty()
    readonly surname: string;

    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(200)
    @ApiProperty()
    readonly password: string;

    @IsEnum(Sex)
    @IsOptional()
    @ApiProperty({ enum: Sex, example: Object.keys(Sex) })
    readonly sex?: Sex;
}
