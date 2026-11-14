import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  mode = signal<'login' | 'register'>('login');
  loading = signal(false);
  error = signal('');
  email = '';
  password = '';

  notice = signal(this.initialNotice());

  private initialNotice(): string {
    const params = this.route.snapshot.queryParamMap;
    if (params.has('forbidden')) return 'This area is reserved for administrators.';
    if (params.has('expired')) return 'Your session has expired. Please sign in again.';
    if (params.has('returnUrl')) return 'Please sign in to continue.';
    return '';
  }

  private returnUrl(): string {
    const url = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
    return url.startsWith('/') && !url.startsWith('//') ? url : '/';
  }

  switchMode(mode: 'login' | 'register') {
    this.mode.set(mode);
    this.error.set('');
  }

  submit() {
    this.error.set('');
    this.loading.set(true);
    const request =
      this.mode() === 'login'
        ? this.auth.login(this.email.trim(), this.password)
        : this.auth.register(this.email.trim(), this.password);

    request.subscribe({
      next: () => {
        this.loading.set(false);
        this.password = '';
        this.router.navigateByUrl(this.returnUrl());
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set(this.message(err));
      },
    });
  }

  logout() {
    this.auth.logout();
  }

  private message(err: HttpErrorResponse): string {
    switch (err.status) {
      case 400:
        return 'Enter a valid email address and a password of at least 8 characters.';
      case 401:
        return 'Invalid email or password.';
      case 409:
        return 'This email is already registered.';
      case 429:
        return 'Too many attempts. Please wait a few minutes.';
      default:
        return 'The server could not be reached. Please try again later.';
    }
  }
}
