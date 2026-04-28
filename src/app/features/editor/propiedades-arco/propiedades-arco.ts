import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Arco } from '../../../models/arco';

@Component({
  selector: 'app-propiedades-arco',
  imports: [ReactiveFormsModule],
  templateUrl: './propiedades-arco.html',
  styleUrl: './propiedades-arco.css',
})
export class PropiedadesArco implements OnChanges {
  @Input() arco: Arco | null = null;
  @Output() arcoModificado = new EventEmitter<Arco>();

  propiedadesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.propiedadesForm = this.fb.group({
      etiqueta: ['']
    });

    this.propiedadesForm.valueChanges.subscribe(val => {
      if (this.propiedadesForm.valid && this.arco) {
        const updated: Arco = {
          ...this.arco,
          etiqueta: val.etiqueta
        };
        this.arcoModificado.emit(updated);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['arco'] && this.arco) {
      this.propiedadesForm.patchValue({
        etiqueta: this.arco.etiqueta || ''
      }, { emitEvent: false });
    }
  }
}
