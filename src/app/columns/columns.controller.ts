import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { ColumnResponse } from './responses/column.response';
import { GetCurrentUserIdDecorator } from '../../common/decorators/get-current-userId.decorator';
import { CreateColumnDto } from './dto/create-column.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
@ApiTags('columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {}

    @Post()
    @ApiOkResponse({ type: ColumnResponse })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateColumnDto, @GetCurrentUserIdDecorator() userId: string): Promise<ColumnResponse> {
        return await this.columnsService.create(dto, userId);
    }

    @Patch(':id')
    @ApiOkResponse({ type: ColumnResponse })
    @ApiBadRequestResponse({ description: 'column does not exist' })
    @ApiUnauthorizedResponse({ description: 'you must be column owner' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async update(
        @Body() dto: UpdateColumnDto,
        @GetCurrentUserIdDecorator() userId: string,
        @Param('id') id: string,
    ): Promise<ColumnResponse> {
        return await this.columnsService.update(dto, userId, id);
    }

    @Delete(':id')
    @ApiOkResponse()
    @ApiBadRequestResponse({ description: 'column does not exist' })
    @ApiUnauthorizedResponse({ description: 'you must be column owner' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async delete(@Param('id') id: string, @GetCurrentUserIdDecorator() userId: string) {
        return await this.columnsService.delete(id, userId);
    }
}
