import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly configService: ConfigService, 
        private readonly userService: UserService) {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: configService.get('JWT_SECRET')
            });
    }

    async validate(payload: any, done: VerifiedCallback): Promise<any> {
        const user = await this.userService.findUserByEmail(payload.username);
        if (!user) {
            return done(new UnauthorizedException({ message: 'User is not recognised' }), false);
        }
        
        return done(null, user);
    }
}