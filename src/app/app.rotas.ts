import { Routes } from '@angular/router';

// Componentes
import { HomeComponent } from './paginas/home/home.component';

export const ROTAS: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
];