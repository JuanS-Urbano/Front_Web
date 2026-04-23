import { Component, OnInit } from '@angular/core';
import { Session } from '../../core/services/session';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  nombreUsuario = '';
  nombreEmpresa = '';

  constructor(private sessionService: Session) {}

  ngOnInit(): void {
    this.sessionService.session$.subscribe((session) => {
      if (session) {
        this.nombreUsuario = session.email;
        this.nombreEmpresa = session.nombreEmpresa;
      }
    });
  }
}
