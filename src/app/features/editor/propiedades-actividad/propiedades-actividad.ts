import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from '../../../models/actividad';
import { Lane } from '../../../models/lane';

@Component({
  selector: 'app-propiedades-actividad',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './propiedades-actividad.html',
  styleUrl: './propiedades-actividad.css',
})
export class PropiedadesActividad implements OnChanges {
  @Input() actividad: Actividad | null = null;
  @Input() lanes: Lane[] = [];
  @Output() actividadModificada = new EventEmitter<Actividad>();

  propiedadesForm: FormGroup;

  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);

  constructor() {
    this.propiedadesForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['USER', Validators.required],
      laneId: [0]
    });

    this.propiedadesForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => {
        if (this.propiedadesForm.valid && this.actividad) {
          const updated: Actividad = {
            ...this.actividad,
            nombre: val.nombre,
            tipo: val.tipo,
            laneId: val.laneId ? +val.laneId : 0
          };
          this.actividadModificada.emit(updated);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actividad'] && this.actividad) {
      this.propiedadesForm.patchValue({
        nombre: this.actividad.nombre,
        tipo: this.actividad.tipo,
        laneId: this.actividad.laneId ?? 0
      }, { emitEvent: false });
    }
  }
}
