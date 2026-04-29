import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Empresa } from '../../../services/empresa';

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

    // Servicio → Observable → .subscribe()
    this.empresaService.crearEmpresa(this.registroForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'Empresa registrada. Guardá estas credenciales del administrador:';
        this.credencialesAdmin = {
          email: this.registroForm.value.correoContacto,
          password: response.data?.passwordInicialAdmin ?? ''
        };
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error al registrar la empresa';
      }
    });
  }
}
