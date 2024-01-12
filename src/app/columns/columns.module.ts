import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CardsModule } from '../cards/cards.module';

@Module({
    imports: [PrismaModule, JwtModule, CardsModule],
    controllers: [ColumnsController],
    providers: [ColumnsService],
    exports: [ColumnsService],
})
export class ColumnsModule {}
