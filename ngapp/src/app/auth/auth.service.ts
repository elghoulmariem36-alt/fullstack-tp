import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthUser {
  id: number;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface Session {
  token: string;
  user: AuthUser;
}

const STORAGE_KEY = 'bazar.session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private session = signal<Session | null>(this.restore());

  user = computed(() => this.session()?.user ?? null);
  isLoggedIn = computed(() => this.session() !== null);
  isAdmin = computed(() => this.session()?.user.role === 'ADMIN');

  get token(): string | null {
    return this.session()?.token ?? null;
  }

  login(email: string, password: string): Observable<Session> {
    return this.http
      .post<Session>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(tap((s) => this.save(s)));
  }

  register(email: string, password: string): Observable<Session> {
    return this.http
      .post<Session>(`${environment.apiUrl}/auth/register`, { email, password })
      .pipe(tap((s) => this.save(s)));
  }

  logout() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    this.session.set(null);
  }

  private save(session: Session) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      /* storage unavailable */
    }
    this.session.set(session);
  }

  private restore(): Session | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  }
}
