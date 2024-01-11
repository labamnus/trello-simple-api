import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateColumnDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @ApiProperty()
    readonly title: string;
}
