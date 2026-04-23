import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario as UsuarioService } from '../../../services/usuario';
import { Session } from '../../../core/services/session';

@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm implements OnInit {

  usuarioForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private sessionService: Session,
    private router: Router
  ) {}

  ngOnInit(): void {
    const empresaId = this.sessionService.getEmpresaId() ?? 0;

    // UsuarioCreateDTO: { email, password, empresaId }
    this.usuarioForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      empresaId: [empresaId, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // Servicio → Observable → .subscribe()
    this.usuarioService.crearUsuario(this.usuarioForm.value).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Usuario creado exitosamente';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/usuarios']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error al crear el usuario';
      }
    });
  }
}
