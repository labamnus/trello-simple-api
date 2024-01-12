import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnResponse } from './responses/column.response';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateColumnDto, userId: string): Promise<ColumnResponse> {
        const column = await this.prisma.column.create({ data: { author_id: userId, ...dto } });

        return column;
    }

    async getColumnsByUserId(userId: string, take: number, skip: number): Promise<ColumnResponse[]> {
        const columns = await this.prisma.column.findMany({
            where: { author_id: userId, is_deleted: false },
            take,
            skip,
        });

        return columns;
    }

    async findOne(columnId: string): Promise<ColumnResponse> {
        return await this.prisma.column.findUnique({ where: { id: columnId, is_deleted: false } });
    }

    async update(dto: UpdateColumnDto, userId: string, columnId: string): Promise<ColumnResponse> {
        const updatedColumn = await this.prisma.column.update({ where: { id: columnId }, data: { ...dto } });

        return updatedColumn;
    }

    async delete(columnId: string, userId: string) {
        await this.prisma.column.update({ where: { id: columnId }, data: { is_deleted: true } });
    }
}
