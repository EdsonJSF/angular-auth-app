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

  login(mail: string, pass: string) {
    const url = `${this.baseURL}/auth`;
    const body = { mail, pass };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        this.setUsuario(resp.data!);
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseURL}/auth/renew`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        this.setUsuario(resp.data!);

        return resp.ok;
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }

  private setUsuario(usuario: Usuario) {
    this._usuario = usuario;
    localStorage.setItem('token', this._usuario.token);
  }
}
