import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [PrismaModule, JwtModule],
    providers: [CommentsService],
    controllers: [CommentsController],
})
export class CommentsModule {}
