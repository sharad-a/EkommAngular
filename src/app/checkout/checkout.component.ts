import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  checkoutData = {
    name: '',
    address: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  };

  constructor(private cartService: CartService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.cartService.getCartItems();
      this.cartItems = response.cart;
      this.calculateTotalPrice();
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.product.prodPrice * item.quantity);
    }, 0);
  }

  async confirmOrder(): Promise<void> {
    try {
      const response = await this.cartService.checkout(this.checkoutData);
      console.log('Order confirmed:', response);
      // Navigate to a success or order summary page if necessary
      this.router.navigate(['/order-success']);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  }
}
