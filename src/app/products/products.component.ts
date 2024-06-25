import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService, CartService, AuthService]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.productService.getProducts();
      this.products = response.products;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async addToCart(productId: string): Promise<void> {
    const userId = this.authService.getUserId();

    console.log("prod compo - add to cart");
    
    const cartItem = {
      userId,
      productId,
      quantity: 1
    };

    try {
      const response = await this.cartService.addToCart(cartItem);
      console.log('Product added to cart:', response);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  viewProductDetail(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
}
