import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponse } from './responses/comment.response';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateCommentDto, userId: string): Promise<CommentResponse> {
        if (await !this.prisma.card.findUnique({ where: { id: dto.card_id } }))
            throw new BadRequestException('card does not exist');

        const comment = await this.prisma.comment.create({
            data: { author_id: userId, ...dto },
            select: { id: true, author_id: true, card_id: true, text: true, created_at: true, updated_at: true },
        });

        return comment;
    }

    async getCommentById(commentId: string, take: number, skip: number) {
        return await this.prisma.comment.findUnique({
            where: { id: commentId, is_deleted: false },
            select: {
                id: true,
                author_id: true,
                card_id: true,
                text: true,
                created_at: true,
                updated_at: true,
            },
        });
    }

    async getCommentsByCardId(cardId: string, take: number, skip: number): Promise<CommentResponse[]> {
        return await this.prisma.comment.findMany({
            where: { card_id: cardId, is_deleted: false },
            select: { id: true, author_id: true, card_id: true, text: true, created_at: true, updated_at: true },
            take,
            skip,
        });
    }

    async getCommentsByUserId(userId: string, take: number, skip: number): Promise<CommentResponse[]> {
        return await this.prisma.comment.findMany({
            where: { author_id: userId, is_deleted: false },
            select: { id: true, author_id: true, card_id: true, text: true, created_at: true, updated_at: true },
            take,
            skip,
        });
    }

    async update(dto: UpdateCommentDto, userId: string, commentId: string): Promise<CommentResponse> {
        const comment = await this.prisma.comment.findUnique({ where: { id: commentId, is_deleted: false } });
        if (!comment) throw new BadRequestException('comment does not exist');
        if (comment.author_id !== userId) throw new UnauthorizedException('you must be comment owner');

        const updatedComm = await this.prisma.comment.update({
            where: { id: commentId },
            data: { ...dto },
            select: { id: true, author_id: true, card_id: true, text: true, created_at: true, updated_at: true },
        });

        return updatedComm;
    }

    async delete(commentId: string, userId: string) {
        const comment = await this.prisma.comment.findUnique({ where: { id: commentId, is_deleted: false } });
        if (!comment) throw new BadRequestException('comment does not exist');
        if (comment.author_id !== userId) throw new UnauthorizedException('you must be comment owner');

        await this.prisma.comment.update({ where: { id: commentId, author_id: userId }, data: { is_deleted: true } });
    }
}
