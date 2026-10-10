import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Contact } from './contact/contact';
import { Products } from './products/products';
import { ProductDetail } from './product-detail/product-detail';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'contact', component: Contact },
  { path: 'contact/:id', component: Contact },
  { path: 'products', component: Products },
  { path: 'products/:id', component: ProductDetail },
];
