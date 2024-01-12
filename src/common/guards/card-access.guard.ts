import { BadRequestException, CanActivate, ForbiddenException } from '@nestjs/common';
import { CardsService } from '../../app/cards/cards.service';

export class CardAccessGuard implements CanActivate {
    constructor(private cardsService: CardsService) {}
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const cardId = request.params.id;
        const userId = request.userId;

        const card = await this.cardsService.findOne(cardId);
        if (!card) {
            throw new BadRequestException('card does not exist');
        }
        if (card.author_id !== userId) {
            throw new ForbiddenException('you must be card owner');
        }
        return true;
    }
}
