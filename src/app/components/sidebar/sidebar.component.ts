import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  id: number;
  currentUser: any = null; // Para almacenar los datos del usuario logueado
  username: string;
  userrole: string;

  constructor(
    private aRouter: ActivatedRoute,
    private authService: AuthService // Inyectamos el AuthService
  ) {
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    this.loadUserData(); // Cargamos los datos del usuario al iniciar
    this.username = this.currentUser?.user_name;
    this.userrole = this.currentUser?.user_role;

  }

  ngOnInit(): void {
    this.loadUserData(); // Cargamos los datos del usuario al iniciar
    this.username = this.currentUser?.user_name;
    this.userrole = this.currentUser?.user_role;
  }

  loadUserData() {
    this.currentUser = this.authService.currentUser; // Obtenemos los datos del usuario desde el AuthService
    if (!this.currentUser) {
      console.error('No hay usuario logueado.');
    }
  }
}
