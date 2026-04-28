import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from '../../../models/actividad';

@Component({
  selector: 'app-propiedades-actividad',
  imports: [ReactiveFormsModule],
  templateUrl: './propiedades-actividad.html',
  styleUrl: './propiedades-actividad.css',
})
export class PropiedadesActividad implements OnChanges {
  @Input() actividad: Actividad | null = null;
  @Output() actividadModificada = new EventEmitter<Actividad>();

  propiedadesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.propiedadesForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['USER', Validators.required] // USER, SERVICE, SCRIPT, etc.
    });

    this.propiedadesForm.valueChanges.subscribe(val => {
      if (this.propiedadesForm.valid && this.actividad) {
        // Emit changes to parent
        const updated: Actividad = {
          ...this.actividad,
          nombre: val.nombre,
          tipo: val.tipo
        };
        this.actividadModificada.emit(updated);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actividad'] && this.actividad) {
      this.propiedadesForm.patchValue({
        nombre: this.actividad.nombre,
        tipo: this.actividad.tipo
      }, { emitEvent: false }); // Do not emit to avoid infinite loop
    }
  }
}
