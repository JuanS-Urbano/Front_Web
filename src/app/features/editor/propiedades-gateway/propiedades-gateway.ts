import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gateway } from '../../../models/gateway';

@Component({
  selector: 'app-propiedades-gateway',
  imports: [ReactiveFormsModule],
  templateUrl: './propiedades-gateway.html',
  styleUrl: './propiedades-gateway.css',
})
export class PropiedadesGateway implements OnChanges {
  @Input() gateway: Gateway | null = null;
  @Output() gatewayModificado = new EventEmitter<Gateway>();

  propiedadesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.propiedadesForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['Exclusivo', Validators.required]
    });

    this.propiedadesForm.valueChanges.subscribe(val => {
      if (this.propiedadesForm.valid && this.gateway) {
        const updated: Gateway = {
          ...this.gateway,
          nombre: val.nombre,
          tipo: val.tipo
        };
        this.gatewayModificado.emit(updated);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gateway'] && this.gateway) {
      this.propiedadesForm.patchValue({
        nombre: this.gateway.nombre,
        tipo: this.gateway.tipo
      }, { emitEvent: false });
    }
  }
}
