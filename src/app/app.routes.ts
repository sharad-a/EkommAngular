import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {
        path: "", component: HomeComponent
    },
    {
        path: "register", component: RegisterComponent
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "home", component: HomeComponent
    },
    {
        path: "products", component: ProductsComponent
    },
    {
        path: "products/:id", component: ProductDetailComponent
    },
    {
        path: "cart", component: CartComponent, // canActivate: AuthGuard
    },
    {
        path: "contact", component: ContactComponent
    },
    {
        path: "add-to-cart", component: ProductsComponent
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
