import { BadRequestException, CanActivate, ForbiddenException } from '@nestjs/common';
import { CommentsService } from '../../app/comments/comments.service';

export class CommentAccessGuard implements CanActivate {
    constructor(private commentService: CommentsService) {}
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const commentId = request.params.id;
        const userId = request.userId;

        const comment = await this.commentService.findOne(commentId);
        if (!comment) {
            throw new BadRequestException('comment does not exist');
        }
        if (comment.author_id !== userId) {
            throw new ForbiddenException('you must be comment owner');
        }
        return true;
    }
}
