import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { ToastNotification } from '../../../shared/components/toast-notification/toast-notification';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, Navbar, Sidebar, ToastNotification, AsyncPipe],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
})
export class AppLayout {
  sidebarOpen = true;

  constructor(public toastService: ToastService) {}

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
