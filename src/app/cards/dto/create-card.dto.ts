import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
}
