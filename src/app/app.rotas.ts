import { Routes } from '@angular/router';

// Componentes
import { HomeComponent } from './paginas/home/home.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { AutenticarComponent } from './paginas/autenticar/autenticar.component';

export const ROTAS: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'cadastro', component: CadastroComponent, data: { title: 'Cadastro' } },
    { path: 'autenticar', component: AutenticarComponent, data: { title: 'Autenticar' } }
];
