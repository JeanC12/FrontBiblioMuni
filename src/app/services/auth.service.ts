import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';  // Para gestionar los datos del usuario

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private myAppUrl: string;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);  // Gestión de usuario logueado

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.myAppUrl = `${environment.endpoint}auth`;

    // Verificar si el usuario ya está logueado y cargar los datos desde localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));  // Cargamos el usuario desde localStorage
    }
  }

  // Modificado para devolver un observable y almacenar los datos del usuario
  login(user: UserCredentials): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}/login`, user).pipe(
      tap(res => {
        // Guardamos el token en localStorage
        localStorage.setItem('token', res.token);

        // Decodificamos el token
        const decodedToken = this.jwtHelper.decodeToken(res.token);

        // Verificamos que el token tiene los datos correctos
        console.log(decodedToken);  // Verifica en la consola si los datos están presentes

        // Creamos el objeto usuario
        const user: User = {
          user_id: decodedToken.id,
          user_name: decodedToken.name,     // Nombre del usuario
          user_role: decodedToken.role,     // Rol del usuario
        };

        // Guardamos el usuario en localStorage y actualizamos el estado
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  // Método para obtener los datos del usuario almacenados
  get currentUser(): User | null {
    return this.userSubject.value;
  }

  // Verificar si el usuario está logueado basado en el token
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // Cerrar sesión, limpiar token y usuario
  logout() {
    // Limpiamos el token y los datos del usuario de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    
    // Limpiamos el estado del usuario en el BehaviorSubject
    this.userSubject.next(null);

    // Redirigimos al login
    this.router.navigate(['/login']);
  }

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener el rol del usuario desde el token almacenado
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.role || null; // Ajusta según cómo se defina el rol en tu token
  }
}

// Interfaz para tipar las credenciales de usuario
export interface UserCredentials {
  user_name: string;
  user_password: string;
}

// Interfaz para el usuario completo (con todos los datos)
export interface User {
  user_id: number;
  user_name: string;
  user_role: string;
}
