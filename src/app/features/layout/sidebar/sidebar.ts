import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Session } from '../../../core/services/session';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  userRole = '';

  private destroyRef = inject(DestroyRef);

  constructor(private sessionService: Session) {}

  ngOnInit(): void {
    this.sessionService.session$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((session) => {
        this.userRole = session?.rolSistema ?? '';
      });
  }
}
