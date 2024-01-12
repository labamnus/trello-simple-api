import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { GetCurrentUserIdDecorator } from '../../common/decorators/get-current-userId.decorator';
import { CommentsService } from './comments.service';
import { CommentResponse } from './responses/comment.response';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentAccessGuard } from '../../common/guards/comment-access.guard';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
    @Post()
    @ApiCreatedResponse({ type: CommentResponse })
    @ApiBadRequestResponse({ description: 'card does not exist' })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create comment' })
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateCommentDto, @GetCurrentUserIdDecorator() userId: string) {
        return await this.commentsService.create(dto, userId);
    }

    @Patch(':id')
    @ApiOkResponse({ type: CommentResponse })
    @ApiBadRequestResponse({ description: 'comment does not exist' })
    @ApiForbiddenResponse({ description: 'you must be comment owner' })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update comment' })
    @UseGuards(JwtGuard, CommentAccessGuard)
    async update(@Param('id') id: string, @Body() dto: UpdateCommentDto, @GetCurrentUserIdDecorator() userId: string) {
        return await this.commentsService.update(dto, userId, id);
    }

    @Delete(':id')
    @ApiOkResponse()
    @ApiBadRequestResponse({ description: 'comment does not exist' })
    @ApiForbiddenResponse({ description: 'comment does not exist' })
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete comment' })
    @UseGuards(JwtGuard, CommentAccessGuard)
    async delete(@Param('id') id: string, @GetCurrentUserIdDecorator() userId: string) {
        return await this.commentsService.delete(id, userId);
    }
}
