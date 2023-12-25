import { CardState } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CardResponse {
    @ApiProperty({ example: '236805a0-c8bc-45c8-96ec-746029d7778a' })
    readonly id: string;

    @ApiProperty({ example: 'Make trello sample' })
    readonly title: string;

    @ApiProperty({ example: 'to id the best' })
    readonly description: string;

    @ApiProperty({ example: '236805a9-c8bc-45c8-96ec-746029d7778a' })
    readonly column_id: string;

    @ApiProperty({ example: '236805a0-c8bc-45c8-96ec-746029d7978a' })
    readonly author_id: string;

    @ApiProperty({ example: 'NONE' })
    readonly state: CardState;

    @ApiProperty({ example: '' })
    readonly created_at: Date;

    @ApiProperty({ example: '' })
    readonly updated_at: Date;
}
