import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CardsService {
    constructor(private readonly prisma: PrismaService) {}
}
