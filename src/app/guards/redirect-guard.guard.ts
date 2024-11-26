import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getUserRole();

      if (userRole === 'admin') {
        this.router.navigate(['/list-books']);
        return false;
      } else if (userRole === 'user') {
        this.router.navigate(['/list-borrow-books']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    return false; // Asegúrate de que siempre retorna false.
  }
}
