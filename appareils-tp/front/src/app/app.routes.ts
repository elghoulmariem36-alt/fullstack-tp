import { Routes } from '@angular/router';
import { Welcome } from './welcome/welcome';
import { AppareilDashboard } from './appareil-dashboard/appareil-dashboard';
import { AppareilDetail } from './appareil-detail/appareil-detail';
import { Contact } from './contact/contact';
import { Authentif } from './authentif/authentif';

export const routes: Routes = [
  { path: 'home', component: Welcome },
  { path: 'appareils', component: AppareilDashboard },
  { path: 'appareils/:id', component: AppareilDetail },
  { path: 'contact', component: Contact },
  { path: 'login', component: Authentif },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
