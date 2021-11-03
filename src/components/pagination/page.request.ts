import { ApiProperty } from '@nestjs/swagger';

export class PageRequest {

    @ApiProperty({
        default: 0,
    })
    page : number = 0;

    @ApiProperty({
        default: 20,
    })
    size : number = 20;

    constructor(page: number | string, size: number | string) {
        this.page = +page || this.page;
        this.size = +size || this.size;
    }
}