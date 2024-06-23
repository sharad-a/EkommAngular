import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  username: string = "";
  email: string = "";
  password: string = "";

  constructor(private router: Router) {}

  async onSubmit() {
    const obj = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    const res = await axios.post('http://localhost:5005/api/register', obj)

    console.log("Reg res: ", res.data.data[0].username)
    
    this.router.navigate(['/login'])
  }

}
