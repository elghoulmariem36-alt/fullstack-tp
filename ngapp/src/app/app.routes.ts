import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'contact', component: Contact },
  { path: 'contact/:id', component: Contact },
];
