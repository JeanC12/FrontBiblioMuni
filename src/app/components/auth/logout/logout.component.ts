import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Limpiar el usuario de localStorage
    localStorage.removeItem('username');

    // Redirigir a la página de inicio de sesión u otra página deseada después de cerrar sesión
    this.router.navigateByUrl('/'); // Reemplaza '/login' con la ruta deseada
  }
}
