import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(accessCode: string): Promise<any> {
        // Phase 1: Hardcoded check as per spec
        // In future, check against DB
        if (accessCode === 'xxxx') {
            // Return a mock user for now
            return { userId: 'mock-uuid', username: 'Member', tier: 'PLATINUM' };
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId, tier: user.tier };
        return {
            access_token: this.jwtService.sign(payload),
            user: user,
        };
    }
}
