import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CommentsService } from '../comments/comments.service';
import { CommentResponse } from '../comments/responses/comment.response';
import { CardResponse } from './responses/card.response';
import { CreateCardDto } from './dto/create-card.dto';
import { GetCurrentUserIdDecorator } from '../../common/decorators/get-current-userId.decorator';
import { CardAccessGuard } from '../../common/guards/card-access.guard';
import { JwtGuard } from '../../common/guards/jwt.guard';

@Controller('cards')
@ApiTags('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService, private readonly commentsService: CommentsService) {}

    @Get(':id/comments')
    @ApiOkResponse({ type: CommentResponse, isArray: true })
    @ApiBadRequestResponse({ description: 'card does not exist' })
    @ApiOperation({ summary: 'Get comments by card id' })
    async getCommentsByCardId(
        @Param('id') columnId: string,
        @Query('take', ParseIntPipe) take: number,
        @Query('skip', ParseIntPipe) skip: number,
    ) {
        return await this.commentsService.getCommentsByCardId(columnId, take, skip);
    }

    @Post()
    @ApiOkResponse({ type: CardResponse })
    @ApiOperation({ summary: 'Create card' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async create(@Body() dto: CreateCardDto, @GetCurrentUserIdDecorator() userId: string): Promise<CardResponse> {
        return await this.cardsService.create(dto, userId);
    }

    @Patch(':id')
    @ApiOkResponse({ type: CardResponse })
    @ApiBadRequestResponse({ description: 'card does not exist' })
    @ApiForbiddenResponse({ description: 'you must be card owner' })
    @ApiOperation({ summary: 'Update card' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard, CardAccessGuard)
    async update(
        @Param('id') id: string,
        @Body() dto: CreateCardDto,
        @GetCurrentUserIdDecorator() userId: string,
    ): Promise<CardResponse> {
        return await this.cardsService.update(dto, userId, id);
    }

    @Delete(':id')
    @ApiOkResponse()
    @ApiBadRequestResponse({ description: 'card does not exist' })
    @ApiForbiddenResponse({ description: 'you must be card owner' })
    @ApiOperation({ summary: 'Delete card' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard, CardAccessGuard)
    async delete(@Param('id') id: string, @GetCurrentUserIdDecorator() userId: string): Promise<void> {
        return await this.cardsService.delete(id, userId);
    }
}
