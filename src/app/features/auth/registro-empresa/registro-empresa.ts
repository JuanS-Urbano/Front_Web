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
        this.successMessage = response.message || 'Empresa registrada exitosamente';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error al registrar la empresa';
      }
    });
  }
}
