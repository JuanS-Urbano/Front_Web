import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Session } from '../../../core/services/session';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  userRole = '';

  constructor(private sessionService: Session) {}

  ngOnInit(): void {
    this.sessionService.session$.subscribe((session) => {
      this.userRole = session?.rolSistema ?? '';
    });
  }
}
