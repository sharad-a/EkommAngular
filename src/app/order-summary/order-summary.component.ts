import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
  providers: [CartService]
})
export class OrderSummaryComponent implements OnInit {
  cartItems: any[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;
  name: string = '';
  address: string = '';
  cardNumber: string = '';
  expirationDate: string = '';
  cvv: string = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.cartService.getCartItems();
      this.cartItems = response.cart;
      this.calculateTotals();
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  calculateTotals(): void {
    this.totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.product.prodPrice * item.quantity), 0);
  }

  async checkout(): Promise<void> {
    const checkoutData = {
      name: this.name,
      address: this.address,
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cvv: this.cvv
    };

    try {
      const response = await this.cartService.checkout(checkoutData);
      console.log('Checkout successful:', response);
      this.router.navigate(['/confirmation']);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }

  async confirmOrder(): Promise<void> {
    // Perform checkout logic, navigate to home on success
    try {
      
      if (confirm('Are you sure you want to confirm your order?')) {
        
        alert('Order confirmed successfully!');
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Failed to confirm order. Please try again.');
    }
  }
}
