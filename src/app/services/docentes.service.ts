import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente';

const BASE_URL = 'http://localhost:3000/api/docentes';

@Injectable({ providedIn: 'root' })
export class DocentesService {
  constructor(private http: HttpClient) {}

  getAll(filters?: { q?: string; especialidad?: string }): Observable<Docente[]> {
    let params = new HttpParams();
    if (filters?.q) params = params.set('q', filters.q);
    if (filters?.especialidad) params = params.set('especialidad', filters.especialidad);
    return this.http.get<Docente[]>(BASE_URL, { params });
  }

  getById(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${BASE_URL}/${id}`);
  }

  create(docente: Docente): Observable<any> {
    return this.http.post(BASE_URL, docente);
  }

  update(id: number, docente: Partial<Docente>): Observable<any> {
    return this.http.put(`${BASE_URL}/${id}`, docente);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }

  getAverage(especialidad?: string): Observable<{ average: number; count: number }> {
    let params = new HttpParams();
    if (especialidad) params = params.set('especialidad', especialidad);
    return this.http.get<{ average: number; count: number }>(`${BASE_URL}/average`, { params });
  }
}
