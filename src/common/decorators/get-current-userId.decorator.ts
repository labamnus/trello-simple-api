import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserIdDecorator = createParamDecorator((_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;
    return userId;
});
