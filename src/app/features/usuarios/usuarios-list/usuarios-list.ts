import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario as UsuarioService } from '../../../services/usuario';
import { Usuario as UsuarioModel } from '../../../models/usuario';
import { Session } from '../../../core/services/session';

@Component({
  selector: 'app-usuarios-list',
  imports: [RouterLink],
  templateUrl: './usuarios-list.html',
  styleUrl: './usuarios-list.css',
})
export class UsuariosList implements OnInit {

  usuarios: UsuarioModel[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private usuarioService: UsuarioService,
    private sessionService: Session
  ) {}

  ngOnInit(): void {
    const empresaId = this.sessionService.getEmpresaId();
    if (!empresaId) {
      this.errorMessage = 'No se pudo obtener la empresa de la sesión';
      this.loading = false;
      return;
    }

    // Patrón: Servicio → Observable → .subscribe() → Refrescar interfaz
    this.usuarioService.getUsuariosPorEmpresa(empresaId).subscribe({
      next: (response) => {
        this.usuarios = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al cargar usuarios';
        this.loading = false;
      }
    });
  }
}
