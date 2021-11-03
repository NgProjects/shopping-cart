import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService, private userService: UserService) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findUserByEmail(email);
        if (user && await bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }
    
    async login(user: User) {
        const payload = { username: user.emailAddress };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
