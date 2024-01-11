import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup.dto';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { UserResponse } from './responses/user.response';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signUp')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: '',
        description: 'JWT token',
    })
    @ApiConflictResponse({ description: 'email already registered' })
    async signUp(@Body() dto: SignUpDto): Promise<string> {
        return this.usersService.signUp(dto);
    }

    @Post('signIn')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: UserResponse })
    @ApiUnauthorizedResponse({ description: 'wrong email or password' })
    async signIn(@Body() dto: SignInDto): Promise<string> {
        return this.usersService.signIn(dto);
    }
}
