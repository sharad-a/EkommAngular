// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';  

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:5005/api';

//   constructor(private http: HttpClient) { }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, credentials);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//   }
// }
