import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppareilModel } from '../models/appareil.model';

@Injectable({ providedIn: 'root' })
export class AppareilService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAppareils(): Observable<AppareilModel[]> {
    return this.http.get<AppareilModel[]>(this.apiUrl);
  }

  getAppareil(id: string): Observable<AppareilModel> {
    return this.http.get<AppareilModel>(`${this.apiUrl}/${id}`);
  }

  addAppareil(appareil: Pick<AppareilModel, 'name' | 'status'>): Observable<AppareilModel> {
    return this.http.post<AppareilModel>(this.apiUrl, appareil);
  }

  updateAppareil(id: string, appareil: Pick<AppareilModel, 'name' | 'status'>): Observable<AppareilModel> {
    return this.http.put<AppareilModel>(`${this.apiUrl}/${id}`, appareil);
  }

  deleteAppareil(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  switchAll(status: 'On' | 'Off'): Observable<{ modified: number }> {
    return this.http.patch<{ modified: number }>(`${this.apiUrl}/switch-all`, { status });
  }
}
