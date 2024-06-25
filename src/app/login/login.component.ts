import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private router: Router, private authService: AuthService) {

  }

  async onSubmit() {
    const obj = {
      email: this.email,
      password: this.password
    }

    // const res = await axios.post('http://localhost:5005/api/login', obj)

    // with receiving cookies
    const res = await axios({
      method:'post',
      url:'http://localhost:5005/api/login',
      data: obj,
      withCredentials:true,
    })

    console.log("login.compo.ts -->res: userId", res.data.data[0]._id)

    this.authService.setUserId(res.data.data[0]._id);

    this.authService.setUserIdFromToken();
    
    if (res.data.data[0].role == "0x88") {
      console.log("Welcome admin");
      this.router.navigate(['/products'])
    } else if (res.data.data[0].role == "0x01") {
      console.log("Welcome user");
      this.router.navigate(['/products'])
    }

  }
}
