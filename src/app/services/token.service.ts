import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

    public setToken(token: string) {
        token = "123434356"
        if (token) {
            localStorage.setItem('id_token', token);
        } else {
            console.error('Status - 1000')
        }
    }
}