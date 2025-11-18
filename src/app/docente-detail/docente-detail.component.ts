import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DocentesService } from '../services/docentes.service';
import { Docente } from '../models/docente';

@Component({
  selector: 'docente-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section *ngIf="docente" class="card">
      <div class="detail-header">
        <div class="avatar-placeholder">
          {{ docente.nombres.charAt(0) }}{{ docente.apellidos.charAt(0) }}
        </div>
        <div>
          <h2 class="detail-title">{{ docente.nombres }} {{ docente.apellidos }}</h2>
          <span class="badge">{{ docente.especialidad }}</span>
        </div>
      </div>
      
      <div class="detail-body">
        <div class="detail-item">
          <label>Correo Electrónico</label>
          <p>{{ docente.correo }}</p>
        </div>
        <div class="detail-item">
          <label>Años de Experiencia</label>
          <p>{{ docente.anos_experiencia }} años</p>
        </div>
      </div>

      <div class="detail-actions">
        <button class="btn btn-secondary" (click)="back()">Volver</button>
        <a [routerLink]="['/edit', docente.id]" class="btn btn-primary">Editar</a>
      </div>
    </section>
    <section *ngIf="!docente" class="loading">
      <p>Cargando información del docente...</p>
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
    .detail-header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .avatar-placeholder {
      width: 64px;
      height: 64px;
      background-color: #e0e7ff;
      color: #4f46e5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .detail-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
      color: #1f2937;
    }
    .badge {
      background-color: #f3f4f6;
      color: #374151;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .detail-body {
      display: grid;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .detail-item label {
      display: block;
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 0.25rem;
    }
    .detail-item p {
      margin: 0;
      font-size: 1.125rem;
      color: #1f2937;
    }
    .detail-actions {
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
      text-decoration: none;
      display: inline-block;
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
    .loading {
      text-align: center;
      padding: 3rem;
      color: #6b7280;
    }
  `]
})
export class DocenteDetailComponent implements OnInit {
  docente?: Docente;
  id?: number;

  constructor(private service: DocentesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.service.getById(this.id).subscribe({ next: (d) => (this.docente = d), error: (e) => console.error(e) });
    }
  }

  back() {
    this.router.navigate(['/']);
  }
}
