import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CommentsService } from '../comments/comments.service';
import { CommentResponse } from '../comments/responses/comment.response';

@Controller('cards')
@ApiTags('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService, private readonly commentsService: CommentsService) {}

    @Get(':id/comments')
    @ApiOkResponse({ type: CommentResponse, isArray: true })
    @ApiBadRequestResponse({ description: 'card does not exist' })
    @ApiOperation({ summary: 'Get comments by card id' })
    async getCommentsByCardId(@Param('id') columnId: string, @Query('take') take: number, @Query('skip') skip: number) {
        return await this.commentsService.getCommentsByCardId(columnId, take, skip);
    }
}
