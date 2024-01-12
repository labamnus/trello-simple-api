import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { ColumnResponse } from './responses/column.response';
import { GetCurrentUserIdDecorator } from '../../common/decorators/get-current-userId.decorator';
import { CreateColumnDto } from './dto/create-column.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnAccessGuard } from '../../common/guards/column-access.guard';
import { CardResponse } from '../cards/responses/card.response';
import { CardsService } from '../cards/cards.service';

@Controller('columns')
@ApiTags('columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService, private readonly cardsService: CardsService) {}

    @Post()
    @ApiOkResponse({ type: ColumnResponse })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create column' })
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateColumnDto, @GetCurrentUserIdDecorator() userId: string): Promise<ColumnResponse> {
        return await this.columnsService.create(dto, userId);
    }

    @Get(':id/cards')
    @ApiOkResponse({ type: CardResponse, isArray: true })
    @ApiBadRequestResponse({ description: 'column does not exist' })
    @ApiOperation({ summary: 'Get cards by column id' })
    async getCards(
        @Param('id') id: string,
        @Query('take', ParseIntPipe) take: number,
        @Query('skip', ParseIntPipe) skip: number,
    ): Promise<CardResponse[]> {
        return await this.cardsService.getCardsByColumnId(id, take, skip);
    }

    @Patch(':id')
    @ApiOkResponse({ type: ColumnResponse })
    @ApiBadRequestResponse({ description: 'column does not exist' })
    @ApiUnauthorizedResponse({ description: 'you must be column owner' })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update column' })
    @UseGuards(JwtGuard, ColumnAccessGuard)
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
    @ApiOperation({ summary: 'Delete column' })
    @UseGuards(JwtGuard, ColumnAccessGuard)
    async delete(@Param('id') id: string, @GetCurrentUserIdDecorator() userId: string) {
        return await this.columnsService.delete(id, userId);
    }
}
