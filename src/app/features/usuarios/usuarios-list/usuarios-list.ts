import { Component, OnInit } from '@angular/core';
import { Usuario as UsuarioService } from '../../../services/usuario';
import { Usuario as UsuarioModel } from '../../../models/usuario';
import { Session } from '../../../core/services/session';

@Component({
  selector: 'app-usuarios-list',
  imports: [],
  templateUrl: './usuarios-list.html',
  styleUrl: './usuarios-list.css',
})
export class UsuariosList implements OnInit {

  usuarios: UsuarioModel[] = [];
  loading = true;

  constructor(
    private usuarioService: UsuarioService,
    private sessionService: Session
  ) {}

  ngOnInit(): void {
    const empresaId = this.sessionService.getEmpresaId();
    if (empresaId) {
      this.usuarioService.getUsuarios(empresaId).subscribe({
        next: (response) => {
          this.usuarios = response.data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando usuarios:', err);
          this.loading = false;
        }
      });
    }
  }
}
