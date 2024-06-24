import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  getToken(): string | null {
    return this.cookieService.get('token'); // token is stored as 'token'
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      console.error('JWT token not found in cookies');
      return null;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
      return tokenPayload.userId; // Assuming your JWT payload includes 'userId'
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }
}
