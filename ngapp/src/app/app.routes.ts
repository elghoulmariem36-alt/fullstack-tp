import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Contact } from './contact/contact';
import { Products } from './products/products';
import { ProductDetail } from './product-detail/product-detail';
import { Admin } from './admin/admin';
import { Tp1 } from './tp1/tp1';
import { NotFound } from './not-found/not-found';
import { adminGuard } from './auth/admin.guard';

export const routes: Routes = [
  { path: '', component: Home, title: 'Bazar' },
  { path: 'products', component: Products, title: 'Catalogue | Bazar' },
  { path: 'products/:id', component: ProductDetail, title: 'Product | Bazar' },
  { path: 'contact', component: Contact, title: 'Contact | Bazar' },
  { path: 'contact/:id', component: Contact, title: 'Contact | Bazar' },
  { path: 'login', component: Login, title: 'Sign in | Bazar' },
  { path: 'admin', component: Admin, title: 'Admin | Bazar', canActivate: [adminGuard] },
  { path: 'tp1', component: Tp1, title: 'TP1 demos | Bazar' },
  { path: '**', component: NotFound, title: 'Not found | Bazar' },
];
