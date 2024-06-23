import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  cartItemCount: number = 0;

  // constructor(private authService: AuthService, private cartService: CartService) { }

  // ngOnInit(): void {
  //   this.cartService.getCartItems().subscribe(cartItems => {
  //     this.cartItemCount = cartItems.length;
  //   });
  // }

  // isLoggedIn(): boolean {
  //   return this.authService.isLoggedIn();
  // }

}
