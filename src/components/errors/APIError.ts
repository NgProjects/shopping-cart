import { isString } from 'lodash';
import { HttpException } from '@nestjs/common';

export interface ErrorPayload {
    status?: number;
    code?: number;
    message: string;
}

export class ApiError extends HttpException {

    constructor(message: string, status = 500) {
        super(message, status);
    }
}
