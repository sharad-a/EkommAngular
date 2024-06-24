import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5005/api/cart';

  constructor(private authService: AuthService) {}

  async getCartItems() {
    try {
      const response = await axios.get(`${this.apiUrl}/user`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  }

  async addToCart(cartItem: { productId: string; quantity: number }) {
    try {

      console.log("add-to-cart clicked")
      
      const token = this.authService.getToken();
      const response = await axios.post(
        `${this.apiUrl}/add-to-cart`,
        cartItem,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log("add-to-cart res data: ", response.data);

      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }
}

