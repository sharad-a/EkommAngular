import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {

      // const userId = this.authService.getUserId();

      // if (!userId) {
      //   this.router.navigate(['/login']);
      //   throw new Error('Please Login First');
      // }
      
      const response = await this.cartService.getCartItems();
      this.cartItems = response.cart;
      this.calculateTotalPrice();
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  async removeFromCart(productId: string): Promise<void> {
    try {
      const response = await this.cartService.removeFromCart(productId);
      console.log('Product removed from cart:', response);
      this.cartItems = this.cartItems.filter(item => item.product._id !== productId);
      this.calculateTotalPrice();
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  }

  getProductPrice(cartItem: any): number {
    return cartItem.product.prodPrice * cartItem.quantity;
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.product.prodPrice * item.quantity);
    }, 0);
  }

  navigateToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
