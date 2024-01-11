import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    @ApiProperty()
    text: string;

    @IsUUID()
    @ApiProperty()
    card_id: string;
}
