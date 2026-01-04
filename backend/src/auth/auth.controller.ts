import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { accessCode: string }) {
        const user = await this.authService.validateUser(body.accessCode);
        if (!user) {
            throw new UnauthorizedException('Invalid access code');
        }
        return this.authService.login(user);
    }
}
