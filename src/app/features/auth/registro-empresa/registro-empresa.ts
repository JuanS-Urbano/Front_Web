import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Empresa } from '../../../services/empresa';
import { finalize, timeout } from 'rxjs';

@Component({
  selector: 'app-registro-empresa',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro-empresa.html',
  styleUrl: './registro-empresa.css',
})
export class RegistroEmpresa {

  registroForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  credencialesAdmin: { email: string; password: string } | null = null;
  copiado = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private empresaService: Empresa,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nit: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correoContacto: ['', [Validators.required, Validators.email]]
    });
  }

  copiarPassword(): void {
    if (!this.credencialesAdmin) return;
    navigator.clipboard.writeText(this.credencialesAdmin.password).then(() => {
      this.copiado = true;
      setTimeout(() => this.copiado = false, 2000);
    });
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const correo = this.registroForm.value.correoContacto;

    this.empresaService.crearEmpresa(this.registroForm.value)
      .pipe(
        timeout(15000),
        finalize(() => { this.loading = false; })
      )
      .subscribe({
        next: (response) => {
          this.credencialesAdmin = {
            email: correo,
            password: response.data?.passwordInicialAdmin ?? ''
          };
        },
        error: (err) => {
          if (err.name === 'TimeoutError') {
            this.errorMessage = 'La solicitud tardó demasiado. Revisá la conexión e intentá de nuevo.';
          } else {
            this.errorMessage = err.error?.message || 'Error al registrar la empresa';
          }
        }
      });
  }
}
