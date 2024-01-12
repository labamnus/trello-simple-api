import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CardState } from '@prisma/client';

export class UpdateCardDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @ApiProperty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsEnum(CardState)
    @ApiProperty({ enum: CardState })
    state: CardState;
}
