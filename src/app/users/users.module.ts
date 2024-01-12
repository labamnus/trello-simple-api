import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommentsModule } from '../comments/comments.module';
import { CardsModule } from '../cards/cards.module';
import { ColumnsModule } from '../columns/columns.module';

@Module({
    imports: [PrismaModule, JwtModule.register({}), CommentsModule, CardsModule, ColumnsModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
