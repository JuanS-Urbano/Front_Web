import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RolProceso as RolService } from '../../../services/rol-proceso';
import { RolProceso as RolModel } from '../../../models/rol-proceso';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './roles-select.html',
  styleUrl: './roles-select.css',
})
export class RolesSelect implements OnInit {
  @Input() selectedRoleId: number | null = null;
  @Output() selectedRoleIdChange = new EventEmitter<number>();
  
  roles: RolModel[] = [];
  loading = true;

  constructor(
    private rolService: RolService
  ) {}

  ngOnInit(): void {
    const empresaId = 1;
    this.rolService.getRoles(empresaId).subscribe({
      next: (response) => {
        this.roles = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando roles para el select', err);
        this.loading = false;
      }
    });
  }

  onChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    if (val) {
      this.selectedRoleIdChange.emit(+val);
    }
  }
}
