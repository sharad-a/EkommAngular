import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService, CartService, AuthService]
})
export class ProductDetailComponent implements OnInit {
  product: any;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      try {
        const response = await this.productService.getProductById(productId);

        console.log("prod-detail.comp.ts --> prod obj res: ", response.product);

        this.product = response.product;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
  }

  async addToCart(): Promise<void> {
    const cartItem = {
      productId: this.product._id,
      quantity: this.quantity
    };

    try {
      const response = await this.cartService.addToCart(cartItem);
      console.log('Product added to cart:', response);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }
}
