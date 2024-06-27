import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5050/api/cart';

  private checkoutUrl = 'http://localhost:5050/api';

  constructor(private authService: AuthService, private router: Router,) { }

  async getCartItems() {
    try {
      const userId = this.authService.getUserId();

      // const userId = this.storage.retrieve('userid');

      console.log("cart.service from auth.service -->userId: ", userId);

      if (!userId) {
        this.router.navigate(['/login']);
        throw new Error('Please Login First');
      }

      const response = await axios.get(`${this.apiUrl}/${userId}`, {
        withCredentials: true,
      });

      console.log("cart featched")

      return response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  }

  async addToCart(cartItem: { productId: string; quantity: number }) {
    try {

      const userId = this.authService.getUserId();

      console.log("userId cart service: ", this.authService.getUserId());

      if (!userId) {
        throw new Error('User is not logged in');
      }

      console.log("cart service - add to cart");

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

  async removeFromCart(productId: string) {
    try {
      const userId = this.authService.getUserId();
      const token = this.authService.getToken();
      const response = await axios.post(
        `${this.apiUrl}/remove-from-cart`,
        { userId, productId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log("remove-from-cart response data: ", response.data);

      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  // async checkout(data: any): Promise<any> {
  async checkout(data: any): Promise<any> {
    try {
      console.log("into checkout")
      const userId = this.authService.getUserId();
      const token = this.authService.getToken();
      const response = await axios.post(
        `${this.checkoutUrl}/checkout`, 
        { userId, data },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log("uid: ", localStorage.getItem('localUserId'));
      return response.data;

    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }

  }

}

