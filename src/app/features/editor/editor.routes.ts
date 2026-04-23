import { Routes } from '@angular/router';

export const EDITOR_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./editor-canvas/editor-canvas').then(m => m.EditorCanvas) }
];
