import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

export class JwtConfigService implements JwtOptionsFactory {

    constructor(private readonly configService: ConfigService) {}

    createJwtOptions(): JwtModuleOptions {
      return {
        secret: '',
        signOptions: { expiresIn: '600s' },
      };
    }
  }