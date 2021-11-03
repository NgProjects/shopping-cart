
import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {

  @IsNumber()
  API_PORT: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRY_TIME: string;
  
  @IsString()
  SWAGGER_URL: string;

}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
