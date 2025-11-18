import { Routes } from '@angular/router';
import { DocentesListComponent } from './docentes-list/docentes-list.component';
import { DocenteFormComponent } from './docente-form/docente-form.component';
import { DocenteDetailComponent } from './docente-detail/docente-detail.component';

export const routes: Routes = [
	{ path: '', component: DocentesListComponent },
	{ path: 'new', component: DocenteFormComponent },
	{ path: 'edit/:id', component: DocenteFormComponent },
	{ path: 'docente/:id', component: DocenteDetailComponent },
	{ path: '**', redirectTo: '' }
];
