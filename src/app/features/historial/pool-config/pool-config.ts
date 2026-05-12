import { Component, Input, OnChanges, SimpleChanges, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pool as PoolService } from '../../../services/pool';
import { Pool as PoolModel } from '../../../models/pool';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-pool-config',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinner],
  templateUrl: './pool-config.html',
  styleUrl: './pool-config.css',
})
export class PoolConfig implements OnChanges {
  @Input() poolId!: number;

  poolForm!: FormGroup;
  poolActual: PoolModel | null = null;
  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';

  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private poolService = inject(PoolService);

  constructor() {
    this.poolForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['poolId'] && this.poolId && this.poolId > 0) {
      this.cargarPool();
    }
  }

  cargarPool(): void {
    this.loading = true;
    this.errorMessage = '';
    this.poolService.getPoolById(this.poolId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.poolActual = response.data;
          this.poolForm.patchValue({
            nombre: this.poolActual?.nombre ?? ''
          });
          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando pool', err);
          this.errorMessage = err.error?.message || 'Error al cargar la configuración del pool';
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    if (this.poolForm.invalid) {
      this.poolForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.poolForm.value;

    this.poolService.updatePool(this.poolId, formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.poolActual = response.data;
          this.successMessage = 'Configuración del Pool actualizada exitosamente.';
          this.saving = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al actualizar el pool';
          this.saving = false;
        }
      });
  }
}
