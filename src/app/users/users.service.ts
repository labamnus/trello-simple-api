import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { configuration } from '../../config/configuration';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}
    async signUp(dto: SignUpDto): Promise<string> {
        const checkUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (checkUser) throw new ConflictException('email already registered');

        const { password } = dto;
        const hash = await this.hashData(password);

        const user = await this.prisma.user.create({
            data: { password: hash, email: dto.email, sex: dto.sex, name: dto.name, surname: dto.surname },
            select: { id: true },
        });

        const token: string = await this.jwt.signAsync(user.id, {
            secret: configuration().JWT_SECRET,
        });
        return token;
    }

    async signIn(dto: SignInDto): Promise<string> {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

        if (!user) throw new UnauthorizedException('wrong email or password');

        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) throw new UnauthorizedException('wrong email or password');

        const token: string = await this.jwt.signAsync(user.id, {
            secret: configuration().JWT_SECRET,
        });
        return token;
    }

    private async hashData(data: string): Promise<string> {
        const salt = await bcrypt.genSalt();

        return await bcrypt.hash(data, salt);
    }
}
