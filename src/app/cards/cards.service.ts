import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CardResponse } from './responses/card.response';

@Injectable()
export class CardsService {
    constructor(private readonly prisma: PrismaService) {}

    async getCardsByColumnId(columnId: string, take: number, skip: number): Promise<CardResponse[]> {
        if (await !this.prisma.column.findUnique({ where: { id: columnId } })) {
            throw new BadRequestException('column does not exist');
        }

        const cards = await this.prisma.card.findMany({
            where: {
                column_id: columnId,
            },
            take,
            skip,
        });
        return cards;
    }
}
