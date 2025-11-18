import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DocentesService } from '../services/docentes.service';
import { Docente } from '../models/docente';

@Component({
  selector: 'docentes-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <section class="card">
      <div class="header-actions">
        <div class="search-group">
          <input class="form-input" placeholder="Buscar (nombre, apellidos, correo)" [(ngModel)]="q" />
          <input class="form-input" placeholder="Especialidad" [(ngModel)]="especialidad" />
        </div>
        <div class="button-group">
          <button class="btn btn-primary" (click)="search()">Buscar</button>
          <button class="btn btn-secondary" (click)="clear()">Limpiar</button>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Especialidad</th>
              <th>Años</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let d of docentes">
              <td>{{ d.nombres }}</td>
              <td>{{ d.apellidos }}</td>
              <td>{{ d.correo }}</td>
              <td>{{ d.especialidad }}</td>
              <td style="text-align:right">{{ d.anos_experiencia }}</td>
              <td class="actions-cell">
                <a [routerLink]="['/docente', d.id]" class="action-link">Ver</a>
                <a [routerLink]="['/edit', d.id]" class="action-link">Editar</a>
                <button (click)="remove(d.id)" class="btn-icon delete" title="Eliminar">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="docentes.length === 0">
              <td colspan="6" style="text-align:center; padding: 2rem; color: #6b7280;">No se encontraron docentes.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      padding: 1.5rem;
    }
    .header-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .search-group {
      display: flex;
      gap: 0.5rem;
      flex: 1;
    }
    .form-input {
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.875rem;
      width: 100%;
      max-width: 300px;
    }
    .button-group {
      display: flex;
      gap: 0.5rem;
    }
    .btn {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: background-color 0.2s;
    }
    .btn-primary {
      background-color: #4f46e5;
      color: white;
    }
    .btn-primary:hover {
      background-color: #4338ca;
    }
    .btn-secondary {
      background-color: #f3f4f6;
      color: #374151;
    }
    .btn-secondary:hover {
      background-color: #e5e7eb;
    }
    .table-container {
      overflow-x: auto;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    .data-table th {
      background-color: #f9fafb;
      text-align: left;
      padding: 0.75rem 1rem;
      font-weight: 600;
      color: #374151;
      border-bottom: 1px solid #e5e7eb;
    }
    .data-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e5e7eb;
      color: #1f2937;
    }
    .actions-cell {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
    .action-link {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
    }
    .action-link:hover {
      text-decoration: underline;
    }
    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      padding: 0;
    }
    .btn-icon:hover {
      opacity: 0.7;
    }
  `]
})
export class DocentesListComponent implements OnInit {
  docentes: Docente[] = [];
  q = '';
  especialidad = '';

  constructor(private service: DocentesService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll({ q: this.q, especialidad: this.especialidad }).subscribe({
      next: (rows) => (this.docentes = rows),
      error: (err) => console.error(err)
    });
  }

  search() {
    this.load();
  }

  clear() {
    this.q = '';
    this.especialidad = '';
    this.load();
  }

  remove(id?: number) {
    if (!id) return;
    if (!confirm('¿Eliminar este docente?')) return;
    this.service.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => alert('Error al eliminar')
    });
  }
}
