import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { AuthResponse, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL: string = environment.baseURL;
  private _usuario!: Usuario;

  public get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}

  registro(name: string, mail: string, pass: string) {
    const url = `${this.baseURL}/auth/new`;
    const body = { name, mail, pass };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        this.setUsuario(resp);
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  login(mail: string, pass: string) {
    const url = `${this.baseURL}/auth`;
    const body = { mail, pass };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        this.setUsuario(resp);
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  logout() {
    localStorage.clear();
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseURL}/auth/renew`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        this.setUsuario(resp);

        return resp.ok;
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }

  private setUsuario(resp: AuthResponse) {
    this._usuario = resp.data!;
    localStorage.setItem('token', resp.token!);
  }
}
