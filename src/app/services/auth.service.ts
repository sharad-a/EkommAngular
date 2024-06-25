import { Injectable } from '@angular/core';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5005/api/auth';
  private userId: string | null = null;

  async login(email: string, password: string) {
    const response = await axios.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true });
    this.userId = response.data.data[0]._id;
    return response.data;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUserId(): string | null {
    return this.userId;
  }

  getToken(): string | null {
    const name = "SessionID=";
    const userId = "userId=";

    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  setUserIdFromToken(): void {
    const token = this.getToken();
    if (token) {
      const decoded = jwtDecode(token);
      // const decoded: any = jwt_decode(token);
      // this.userId = decoded.id;
      console.log("decoded: ", decoded);
    }
  }
}
