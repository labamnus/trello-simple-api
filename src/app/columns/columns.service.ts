import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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

    async getColumnsByUserId(userId: string): Promise<ColumnResponse[]> {
        const columns = await this.prisma.column.findMany({ where: { author_id: userId } });

        return columns;
    }

    async update(dto: UpdateColumnDto, userId: string, columnId: string): Promise<ColumnResponse> {
        const column = await this.prisma.column.findUnique({ where: { id: columnId } });
        if (!column) throw new BadRequestException('column does not exist');
        if (column.author_id !== userId) throw new UnauthorizedException('you must be column owner');

        const updatedColumn = await this.prisma.column.update({ where: { id: columnId }, data: { ...dto } });

        return updatedColumn;
    }

    async delete(columnId: string, userId: string) {
        const column = await this.prisma.column.findUnique({ where: { id: columnId } });
        if (!column) throw new BadRequestException('column does not exist');
        if (column.author_id !== userId) throw new UnauthorizedException('you must be column owner');

        await this.prisma.column.update({ where: { id: columnId }, data: { is_deleted: true } });
    }
}
