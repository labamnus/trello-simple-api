import { ApiProperty } from '@nestjs/swagger';

export class CommentResponse {
    @ApiProperty({ example: '236906a0-c8bc-45c8-96ec-746029d7778a' })
    readonly id: string;

    @ApiProperty({ example: '236805a0-c8bc-45c8-96ec-746029d7778a' })
    readonly author_id: string;

    @ApiProperty({ example: '236805a0-c8bc-45c8-96ec-746029d7779a' })
    readonly card_id: string;

    @ApiProperty({ example: 'It is best card!' })
    readonly text: string;

    @ApiProperty({ example: '' })
    readonly created_at: Date;

    @ApiProperty({ example: '' })
    readonly updated_at: Date;
}
