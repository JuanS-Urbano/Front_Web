import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Session } from '../../core/services/session';

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

  // Display-only counts (static placeholders since there's no API for totals)
  totalProcesos = 0;
  totalUsuarios = 0;
  totalRoles = 0;

  constructor(private sessionService: Session) {}

  ngOnInit(): void {
    // Suscripción al BehaviorSubject de SessionService
    this.sessionService.session$.subscribe((session) => {
      if (session) {
        this.userEmail = session.email;
        this.empresaNombre = session.empresa?.nombre ?? '';
        this.userRole = session.rolSistema;
      }
    });
  }
}
