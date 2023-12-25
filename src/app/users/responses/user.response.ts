import { Sex } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
    @ApiProperty({ example: '236805a0-c8bc-45c8-96ec-746029d7778a' })
    readonly id: string;

    @ApiProperty({ example: 'Dmitry' })
    readonly name: string;

    @ApiProperty({ example: 'Danilov' })
    readonly surname: string;

    @ApiProperty({ example: 'labamnus@yandex.ru' })
    readonly email: string;

    @ApiProperty({ example: 'MALE' })
    readonly sex: Sex;
}
