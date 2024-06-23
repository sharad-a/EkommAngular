// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5005/api/cart';

  async getCartItems() {
    const response = await axios.get(`${this.apiUrl}`);
    return response.data;
  }

  async addToCart(cartItem: { productId: string; quantity: number }) {
    const response = await axios.post(`${this.apiUrl}/add-to-cart`, cartItem);
    return response.data;
  }
}
