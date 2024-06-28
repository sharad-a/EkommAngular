import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  cartItemCount: number = 0;

  constructor(private authService: AuthService, private router: Router) { }

  // ngOnInit(): void {
  //   this.cartService.getCartItems().subscribe(cartItems => {
  //     this.cartItemCount = cartItems.length;
  //   });
  // }

  isLoggedIn(): boolean {
    // console.log("isLooged in -->", this.authService.isLoogedIn())
    return this.authService.isLoogedIn();
  }

  logout(): void {
    localStorage.removeItem('localUserId');
    this.router.navigate(['/products'])
  }

}
