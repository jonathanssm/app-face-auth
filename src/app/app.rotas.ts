import { Routes } from '@angular/router';

// Componentes
import { HomeComponent } from './paginas/home/home.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { AutenticarComponent } from './paginas/autenticar/autenticar.component';
import { ContatosComponent } from './paginas/contatos/contatos.component';

export const ROTAS: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'contatos', component: ContatosComponent, data: { title: 'Contatos' } },
    { path: 'cadastro', component: CadastroComponent, data: { title: 'Cadastro' } },
    { path: 'autenticar', component: AutenticarComponent, data: { title: 'Autenticar' } }
];
