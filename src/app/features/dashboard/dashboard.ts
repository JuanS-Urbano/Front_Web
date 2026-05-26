import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Session } from '../../core/services/session';
import { Metricas as MetricasService } from '../../services';
import { Metricas as MetricasModel } from '../../models';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  userEmail = '';
  empresaNombre = '';
  userRole = '';

  metricas: MetricasModel | null = null;

  totalProcesos = 0;
  totalUsuarios = 0;
  totalRoles = 0;
  totalActividades = 0;

  private destroyRef = inject(DestroyRef);

  constructor(
    private sessionService: Session,
    private metricasService: MetricasService
  ) {}

  ngOnInit(): void {
    this.sessionService.session$
      .pipe(
        switchMap((session) => {
          if (!session) return of(null);

          this.userEmail = session.email;
          this.empresaNombre = session.empresa?.nombre ?? '';
          this.userRole = session.rolSistema;

          const empresaId = this.sessionService.getEmpresaId() ?? 1;

          return this.metricasService.getMetricasPorEmpresa(empresaId).pipe(
            catchError((err) => {
              console.error('Error al obtener métricas:', err);
              return of(null);
            })
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        if (!res || !res.data) return;
        this.metricas = res.data;
        this.totalProcesos = this.metricas.totalProcesos;
        this.totalUsuarios = this.metricas.totalUsuarios;
        this.totalRoles = this.metricas.totalRolesProceso;
        this.totalActividades = this.metricas.totalActividades;
      });
  }
}
