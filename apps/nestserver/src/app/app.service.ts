import { Injectable } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class AppService {
    constructor() { }

    makeId(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    getToken(): string {
        const expiresIn = 300;
        return jsonwebtoken.sign({ _id: '1234567890' }, this.makeId(12), { expiresIn });
    }
}
