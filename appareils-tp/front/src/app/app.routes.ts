import { Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';
import { AppareilDashboard } from './appareil-dashboard/appareil-dashboard';
import { AppareilDetail } from './appareil-detail/appareil-detail';
import { Contact } from './contact/contact';
import { Authentif } from './authentif/authentif';

export const routes: Routes = [
  { path: 'home', component: Welcome, title: 'HomeHub' },
  { path: 'appareils', component: AppareilDashboard, title: 'Dashboard | HomeHub' },
  { path: 'appareils/:id', component: AppareilDetail, title: 'Appliance | HomeHub' },
  { path: 'contact', component: Contact, title: 'Contact | HomeHub' },
  { path: 'login', component: Authentif, title: 'Sign in | HomeHub' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
