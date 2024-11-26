import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout(); // Llama al método del servicio
  }
}
