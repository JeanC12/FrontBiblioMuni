import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'];
    const userRole = this.authService.getUserRole();

    if (this.authService.isLoggedIn() && expectedRoles.includes(userRole)) {
      return true;
    }

    // Redirige al login si no tiene permisos
    this.router.navigate(['/login']);
    return false;
  }
}