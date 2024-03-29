import { IsEnum, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CardState } from '@prisma/client';

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @ApiProperty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsUUID()
    @ApiProperty()
    column_id: string;

    @IsEnum(CardState)
    @ApiProperty({ enum: CardState })
    state: CardState;
}
