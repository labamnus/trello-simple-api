import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule, JwtModule.register({})],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
