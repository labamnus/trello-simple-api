import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { configuration } from '../../config/configuration';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const authHeader = req.headers.authorization;
            const type = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (type !== 'Bearer' || !token) throw new UnauthorizedException({ message: 'invalid token' });

            const userId = this.jwtService.verify(token, { secret: configuration().JWT_SECRET });
            req.userId = userId;

            return true;
        } catch (e) {
            throw new UnauthorizedException({ message: 'invalid token' });
        }
    }
}
