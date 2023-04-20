import { HttpClient } from '@angular/common/http';
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
        this._usuario = resp.data!;
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }
}
