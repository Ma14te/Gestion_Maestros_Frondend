import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DocentesService } from '../services/docentes.service';
import { Docente } from '../models/docente';

@Component({
  selector: 'docente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <section class="card">
      <h2 class="form-title">{{ isEdit ? 'Editar Docente' : 'Nuevo Docente' }}</h2>
      <form (ngSubmit)="save()" class="docente-form">
        <div class="form-grid">
          <div class="form-group">
            <label>Nombres</label>
            <input class="form-input" placeholder="Ej. Juan" [(ngModel)]="model.nombres" name="nombres" required />
          </div>
          <div class="form-group">
            <label>Apellidos</label>
            <input class="form-input" placeholder="Ej. Pérez" [(ngModel)]="model.apellidos" name="apellidos" required />
          </div>
          <div class="form-group full-width">
            <label>Correo Electrónico</label>
            <input class="form-input" placeholder="juan.perez@ejemplo.com" [(ngModel)]="model.correo" name="correo" required />
          </div>
          <div class="form-group">
            <label>Especialidad</label>
            <input class="form-input" placeholder="Ej. Matemáticas" [(ngModel)]="model.especialidad" name="especialidad" required />
          </div>
          <div class="form-group">
            <label>Años de Experiencia</label>
            <input type="number" class="form-input" placeholder="0" [(ngModel)]="model.anos_experiencia" name="anos_experiencia" required />
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" (click)="cancel()">Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </section>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }
    .form-title {
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      color: #1f2937;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .full-width {
      grid-column: span 2;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .form-group label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }
    .form-input {
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.875rem;
    }
    .form-input:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
    }
    .form-actions {
      margin-top: 2rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
    .btn {
      padding: 0.5rem 1.5rem;
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
  `]
})
export class DocenteFormComponent implements OnInit {
  model: Docente = { nombres: '', apellidos: '', correo: '', especialidad: '', anos_experiencia: 0 };
  isEdit = false;
  id?: number;

  constructor(private service: DocentesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.service.getById(this.id).subscribe({ next: (d) => (this.model = d), error: (e) => console.error(e) });
    }
  }

  save() {
    if (this.isEdit && this.id) {
      this.service.update(this.id, this.model).subscribe({ next: () => this.router.navigate(['/']), error: (e) => alert('Error al actualizar') });
    } else {
      this.service.create(this.model).subscribe({ next: () => this.router.navigate(['/']), error: (e) => alert('Error al crear') });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
