import { BadRequestException, CanActivate, ForbiddenException } from '@nestjs/common';
import { ColumnsService } from '../../app/columns/columns.service';

export class ColumnAccessGuard implements CanActivate {
    constructor(private columnsService: ColumnsService) {}
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const columnId = request.params.id;
        const userId = request.userId;

        const column = await this.columnsService.findOne(columnId);
        if (!column) {
            throw new BadRequestException('column does not exist');
        }
        if (column.author_id !== userId) {
            throw new ForbiddenException('you must be column owner');
        }
        return true;
    }
}
