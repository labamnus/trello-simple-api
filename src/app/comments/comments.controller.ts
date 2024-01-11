import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { GetCurrentUserIdDecorator } from '../../common/decorators/get-current-userId.decorator';
import { CommentsService } from './comments.service';
import { CommentResponse } from './responses/comment.response';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
    @Post()
    @ApiCreatedResponse({ type: CommentResponse })
    @ApiBadRequestResponse({ description: 'card does not exist' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateCommentDto, @GetCurrentUserIdDecorator() userId: string) {
        return await this.commentsService.create(dto, userId);
    }

    @Patch(':id')
    @ApiOkResponse({ type: CommentResponse })
    @ApiBadRequestResponse({ description: 'comment does not exist' })
    @ApiUnauthorizedResponse({ description: 'you must be comment owner' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async update(@Param('id') id: string, @GetCurrentUserIdDecorator() userId: string, @Body() dto: UpdateCommentDto) {
        return await this.commentsService.update(dto, userId, id);
    }

    @Delete(':id')
    @ApiOkResponse()
    @ApiBadRequestResponse({ description: 'comment does not exist' })
    @ApiUnauthorizedResponse({ description: 'you must be comment owner' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async delete(@Param('id') id: string, @GetCurrentUserIdDecorator() userId: string) {
        return await this.commentsService.delete(id, userId);
    }
}
