import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'bibliomuni';
  isLoginPage: boolean = false;
  isReady: boolean = false; // Nuevo estado para controlar la carga completa

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verificar si la ruta es la página de inicio de sesión o "/"
        this.isLoginPage = event.url === '/login' || event.url === '/';

        this.isReady = true;
        console.log("ROLE>>>",this.getRole());
      }
    });
  }

  getRole(){
    console.log("Getting");
    if (typeof localStorage !== 'undefined'){
      const storedRole = localStorage.getItem('role');
      console.log(storedRole);
      return storedRole;
    }
    return 'admin';
  }

}
