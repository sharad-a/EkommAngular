import { Injectable } from '@angular/core';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5050/api/auth';
  private userId: string | null = null;

  // constructor(private storage: LocalStorageService) {}

  async login(email: string, password: string) {
    const response = await axios.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true });
    this.userId = response.data.data[0]._id;
    return response.data;
  }

  setUserId(userId: string): void {
    this.userId = userId;
    // this.storage.store('userid', this.userId);
  }

  getUserId(): string | null {
    return localStorage.getItem('localUserId');
    // return this.userId;
  }

  getToken(): string | null {
    const name = "SessionID=";
    const userId = "userId=";

    const decodedCookie = decodeURIComponent(document.cookie);

    console.log("aut.ser -->decodedCookie: ", decodedCookie);
    
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

  // getCookie(): string | null {
  //   const userId = "userId=";

  //   const decodedCookie = decodeURIComponent(document.cookie);

  //   console.log("aut.ser -->decodedCookie: ", decodedCookie);
    
  //   const ca = decodedCookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(userId) == 0) {
  //       return c.substring(userId.length, c.length);
  //     }
  //   }
  //   return null;
  // }

getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
}

setCookie(name: string, value: string, expireDays: number, path: string = '') {
  let d:Date = new Date();
  d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  let expires:string = `expires=${d.toUTCString()}`;
  let cpath:string = path ? `; path=${path}` : '';
  document.cookie = `${name}=${value}; ${expires}${cpath}`;
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
