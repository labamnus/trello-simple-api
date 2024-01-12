import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup.dto';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { UserResponse } from './responses/user.response';
import { CommentsService } from '../comments/comments.service';
import { ColumnsService } from '../columns/columns.service';
import { ColumnResponse } from '../columns/responses/column.response';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly commentsService: CommentsService,
        private readonly columnsService: ColumnsService,
    ) {}

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

    @Get(':userId/columns')
    @ApiOkResponse({ type: ColumnResponse, isArray: true })
    @ApiOperation({ summary: 'Get user columns' })
    async getColumnsByUserId(
        @Param('userId') userId: string,
        @Query('take') take: number,
        @Query('skip') skip: number,
    ) {
        return await this.columnsService.getColumnsByUserId(userId, take, skip);
    }
}
