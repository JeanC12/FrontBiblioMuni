import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private myAppUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.myAppUrl = `${environment.endpoint}auth`;
  }

  login(user: UserCredentials) {
    return this.http.post<any>(`${this.myAppUrl}/login`, user).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/list-books']); // Cambia la ruta según tu configuración
      },
      err => {
        console.error(err);
        alert('Credenciales inválidas');
      }
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

// Interfaz para tipar las credenciales de usuario
interface UserCredentials {
  user_name: string;
  user_password: string;
}
