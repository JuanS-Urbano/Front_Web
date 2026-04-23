import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';
import { Session } from '../../../core/services/session';
import { AuthRequest } from '../../../models/auth-request';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private sessionService: Session,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si ya tiene sesión activa, redirigir al dashboard
    if (this.sessionService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    // Formulario reactivo con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const request: AuthRequest = this.loginForm.value;

    // Patrón: Servicio → Observable → .subscribe() → Refrescar interfaz
    this.authService.login(request).subscribe({
      next: (response) => {
        this.sessionService.login(response.data);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Credenciales inválidas. Intente de nuevo.';
      }
    });
  }
}
