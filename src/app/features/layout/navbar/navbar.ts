import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Session } from '../../../core/services/session';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  userEmail = '';
  empresaNombre = '';
  userRole = '';

  private destroyRef = inject(DestroyRef);

  constructor(
    private sessionService: Session,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscripción al Observable de sesión con auto-cleanup
    this.sessionService.session$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((session) => {
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
