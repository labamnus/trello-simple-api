import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('health')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('ping')
    @HttpCode(HttpStatus.OK)
    ping(): string {
        return 'pong';
    }
}
