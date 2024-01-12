import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CardResponse } from './responses/card.response';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateCardDto, userId: string): Promise<CardResponse> {
        const card = await this.prisma.card.create({
            data: {
                author_id: userId,
                ...dto,
            },
        });
        return card;
    }

    async update(dto: UpdateCardDto, userId: string, id: string): Promise<CardResponse> {
        const card = await this.prisma.card.update({
            where: {
                id,
                author_id: userId,
            },
            data: {
                ...dto,
            },
        });
        return card;
    }

    async delete(id: string, userId: string): Promise<void> {
        await this.prisma.card.update({
            where: {
                id,
                author_id: userId,
            },
            data: {
                is_deleted: true,
            },
        });
    }

    async getCardsByColumnId(columnId: string, take: number, skip: number): Promise<CardResponse[]> {
        if (await !this.prisma.column.findUnique({ where: { id: columnId, is_deleted: false } })) {
            throw new BadRequestException('column does not exist');
        }

        const cards = await this.prisma.card.findMany({
            where: {
                column_id: columnId,
                is_deleted: false,
            },
            take,
            skip,
        });
        return cards;
    }

    async findOne(id: string): Promise<CardResponse> {
        const card = await this.prisma.card.findUnique({
            where: {
                id,
                is_deleted: false,
            },
        });
        return card;
    }
}
