import { ApiProperty } from '@nestjs/swagger';

export class ColumnResponse {
    @ApiProperty({ example: '236805a0-c9bc-45c8-96ec-746029d7778a' })
    readonly id: string;

    @ApiProperty({ example: 'Agile column' })
    readonly title: string;

    @ApiProperty({ example: '236805a0-c9bc-45c8-96ec-746029d7778b' })
    readonly author_id: string;

    @ApiProperty({ example: '' })
    readonly created_at: Date;

    @ApiProperty({ example: '' })
    readonly updated_at: Date;
}
