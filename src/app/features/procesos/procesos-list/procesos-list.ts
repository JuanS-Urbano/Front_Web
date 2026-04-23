import { Component, OnInit } from '@angular/core';
import { Proceso as ProcesoService } from '../../../services/proceso';
import { Proceso as ProcesoModel } from '../../../models/proceso';

@Component({
  selector: 'app-procesos-list',
  imports: [],
  templateUrl: './procesos-list.html',
  styleUrl: './procesos-list.css',
})
export class ProcesosList implements OnInit {

  procesos: ProcesoModel[] = [];
  loading = true;

  constructor(private procesoService: ProcesoService) {}

  ngOnInit(): void {
    this.procesoService.getProcesos(1).subscribe({
      next: (response) => {
        this.procesos = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando procesos:', err);
        this.loading = false;
      }
    });
  }
}
