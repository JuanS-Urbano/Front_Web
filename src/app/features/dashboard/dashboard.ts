import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Session } from '../../core/services/session';
import { Proceso as ProcesoService } from '../../services/proceso';
import { Usuario as UsuarioService } from '../../services/usuario';
import { RolProceso as RolProcesoService } from '../../services/rol-proceso';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  userEmail = '';
  empresaNombre = '';
  userRole = '';

  // Display-only counts
  totalProcesos = 0;
  totalUsuarios = 0;
  totalRoles = 0;

  private destroyRef = inject(DestroyRef);

  constructor(
    private sessionService: Session,
    private procesoService: ProcesoService,
    private usuarioService: UsuarioService,
    private rolProcesoService: RolProcesoService
  ) {}

  ngOnInit(): void {
    // Suscripción al BehaviorSubject de SessionService con auto-cleanup
    this.sessionService.session$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((session) => {
        if (session) {
          this.userEmail = session.email;
          this.empresaNombre = session.empresa?.nombre ?? '';
          this.userRole = session.rolSistema;
          
          // Cargar datos reales
          this.cargarDatos();
        }
      });
  }

  private cargarDatos(): void {
    const empresaId = this.sessionService.getEmpresaId();
    const poolId = empresaId ?? 1; // Fallback a 1

    // Cargar procesos
    this.procesoService.getProcesos(poolId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.totalProcesos = response.data.length;
        },
        error: (err) => {
          console.error('Error cargando procesos:', err);
        }
      });

    // Cargar usuarios
    this.usuarioService.getUsuariosPorEmpresa(poolId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.totalUsuarios = response.data.length;
        },
        error: (err) => {
          console.error('Error cargando usuarios:', err);
        }
      });

    // Cargar roles
    this.rolProcesoService.getRoles(poolId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.totalRoles = response.data.length;
        },
        error: (err) => {
          console.error('Error cargando roles:', err);
        }
      });
  }
}
