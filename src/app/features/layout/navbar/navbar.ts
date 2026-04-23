import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../../../core/services/session';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  userEmail = '';
  empresaNombre = '';
  userRole = '';

  constructor(
    private sessionService: Session,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscripción al Observable de sesión para refrescar la interfaz
    this.sessionService.session$.subscribe((session) => {
      if (session) {
        this.userEmail = session.email;
        this.empresaNombre = session.empresa?.nombre ?? '';
        this.userRole = session.rolSistema;
      }
    });
  }

  onLogout(): void {
    this.sessionService.logout();
    this.router.navigate(['/auth/login']);
  }
}
