import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {

  private url: string = 'api/auth';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user): Promise<any> {
    return this.http
      .post(`${this.url}/login`, JSON.stringify(user), { headers: this.headers })
      .toPromise();
  }
}
