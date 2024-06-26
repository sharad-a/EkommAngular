// user.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: string | null = null;

  constructor(private cookieService: CookieService) {
    this.loadUserIdFromCookie();
  }

  private loadUserIdFromCookie(): void {
    this.userId = this.cookieService.get('userId');
  }

  public getUserId(): string | null {
    return this.userId;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
    this.cookieService.set('userId', userId);
  }
}
