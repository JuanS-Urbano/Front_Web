import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import { Session } from '../../../core/services/session';
import { AuthRequest } from '../../../models/auth-request';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: Auth,
    private sessionService: Session,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si ya tiene sesión, redirigir al dashboard
    if (this.sessionService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin(): void {
    const request: AuthRequest = { email: this.email, password: this.password };
    this.authService.login(request).subscribe({
      next: (response) => {
        this.sessionService.login(response.data);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas';
        console.error('Error en login:', err);
      }
    });
  }
}
