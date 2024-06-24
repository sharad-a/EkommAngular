import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {

  }

  async onSubmit() {
    const obj = {
      email: this.email,
      password: this.password
    }

    const res = await axios.post('http://localhost:5005/api/login', obj)

    console.log("res: ", res.data.data[0].role)

    if (res.data.data[0].role == "0x88") {
      this.router.navigate(['/products'])
    } else if (res.data.data[0].role == "0x01") {
      this.router.navigate(['/products'])
    }

  }
}
