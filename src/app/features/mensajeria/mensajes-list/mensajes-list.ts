import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Mensaje as MensajeService } from '../../../services/mensaje';
import { Mensaje as MensajeModel } from '../../../models/mensaje';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-mensajes-list',
  standalone: true,
  imports: [CommonModule, LoadingSpinner],
  templateUrl: './mensajes-list.html',
  styleUrl: './mensajes-list.css',
})
export class MensajesList implements OnInit {
  @Input() procesoId?: number;
  
  mensajes: MensajeModel[] = [];
  loading = true;
  error: string | null = null;
  
  private route = inject(ActivatedRoute);
  private mensajeService = inject(MensajeService);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('procesoId') || this.route.snapshot.paramMap.get('id');
    const pid = this.procesoId || (idParam ? Number(idParam) : undefined);
    
    if (pid) {
      this.cargarMensajes(pid);
    } else {
      this.loading = false;
      this.error = "No se especificó un ID de proceso.";
    }
  }

  cargarMensajes(procesoId: number): void {
    this.loading = true;
    this.error = null;
    this.mensajeService.getMensajes(procesoId).subscribe({
      next: (response) => {
        this.mensajes = response.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando mensajes:', err);
        this.error = 'No se pudieron cargar los mensajes.';
        this.loading = false;
      }
    });
  }
}
