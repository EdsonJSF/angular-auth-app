import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { AuthResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL: string = environment.baseURL;

  constructor(private http: HttpClient) {}

  login(mail: string, pass: string): Observable<AuthResponse> {
    const url = `${this.baseURL}/auth`;
    const body = { mail, pass };

    return this.http.post<AuthResponse>(url, body);
  }
}
