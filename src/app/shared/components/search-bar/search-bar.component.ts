import { Component, Output, EventEmitter } from '@angular/core';

/** Componente reutilizable: Barra de búsqueda. */
@Component({ selector: 'app-search-bar', standalone: true, imports: [], templateUrl: './search-bar.component.html', styleUrl: './search-bar.component.css' })
export class SearchBarComponent {
  @Output() searchChange = new EventEmitter<string>();

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
}
