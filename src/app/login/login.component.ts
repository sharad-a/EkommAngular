import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { LocalStorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie-service';

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

  // @LocalStorage('boundvalue')

  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) { }

  async onSubmit() {
    const obj = {
      email: this.email,
      password: this.password
    }

    // const res = await axios.post('http://localhost:5005/api/login', obj)

    // with receiving cookies
    const res = await axios({
      method: 'post',
      url: 'http://localhost:5005/api/login',
      data: obj,
      withCredentials: true,
    })


    console.log("login.compo.ts -->res: userId", res.data.data[0]._id);

    localStorage.setItem('localUserId', res.data.data[0]._id);

    // const userId = res.data.data[0]._id;

    const userCookie = this.authService.setUserId(res.data.data[0]._id);
    // const userCookie = this.authService.setCookie("userId", "123", 2, "/api");
    // const userCookie = this.cookieService.get('userId');
    console.log("userCookie:: ", userCookie);

    // locally storing userid
    // this.storage.store('userid', userid);

    // check if stored
    // console.log("storage.store at login.comp --> ", this.storage.retrieve('userid'));
    console.log("storage.store at login.comp --> ", this.authService.getCookie("userId"));

    this.authService.setUserId(res.data.data[0]._id);

    this.authService.setUserIdFromToken();

    if (res.data.data[0].role == "0x88") {
      console.log("Welcome admin");
      // this.storage.store('userid', userid);
      this.router.navigate(['/products'])
    } else if (res.data.data[0].role == "0x01") {
      console.log("Welcome user");
      // this.storage.store('userid', userid);
      this.router.navigate(['/products'])
    }

  }
}
