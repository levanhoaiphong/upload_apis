import { HttpException, HttpStatus } from '@nestjs/common';

export class SuccessException extends HttpException {
    constructor(statusCode: any, data: any, message: string, date: any) {
        super({ statusCode, data, message,  date }, HttpStatus.OK);
    }
}