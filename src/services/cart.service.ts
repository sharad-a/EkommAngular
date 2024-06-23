// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private apiUrl = 'http://localhost:5005/api';

//   constructor(private http: HttpClient) { }

//   getCartItems(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/cart`);
//   }

//   addToCart(productId: string, quantity: number): Observable<any> {
//     return this.http.post(`${this.apiUrl}/cart`, { productId, quantity });
//   }

//   removeFromCart(productId: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/cart/${productId}`);
//   }
// }
