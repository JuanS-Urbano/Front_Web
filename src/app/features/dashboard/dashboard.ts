import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Session } from '../../core/services/session';
import { Proceso as ProcesoService } from '../../services/proceso';
import { Usuario as UsuarioService } from '../../services/usuario';
import { RolProceso as RolProcesoService } from '../../services/rol-proceso';

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
    // Suscripción al BehaviorSubject de SessionService con auto-cleanup.
    // Encadenamos forkJoin con switchMap para que takeUntilDestroyed cubra todo el flujo.
    this.sessionService.session$
      .pipe(
        switchMap((session) => {
          if (!session) return of(null);

          this.userEmail = session.email;
          this.empresaNombre = session.empresa?.nombre ?? '';
          this.userRole = session.rolSistema;

          const empresaIdOriginal = this.sessionService.getEmpresaId();
          const empresaIdFallback = empresaIdOriginal ?? 1;
          const poolId = this.sessionService.getPoolId() ?? empresaIdFallback;

          return forkJoin({
            procesos: this.procesoService.getProcesos(poolId).pipe(catchError(() => of({ data: [] as any[] } as any))),
            usuarios: this.usuarioService.getUsuariosPorEmpresa(empresaIdFallback).pipe(catchError(() => of({ data: [] as any[] } as any))),
            roles: this.rolProcesoService.getRoles(poolId).pipe(catchError(() => of({ data: [] as any[] } as any))),
          });
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        if (!res) return;
        this.totalProcesos = res.procesos.data?.length ?? 0;
        this.totalUsuarios = res.usuarios.data?.length ?? 0;
        this.totalRoles = res.roles.data?.length ?? 0;
      });
  }
}
