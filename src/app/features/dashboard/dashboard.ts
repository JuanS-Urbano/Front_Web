import { Component, OnInit } from '@angular/core';
import { Session } from '../../core/services/session';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  userEmail = '';
  empresaNombre = '';
  userRole = '';

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
