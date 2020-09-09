import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Ngx
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './paginas/home/home.component';
import { NavBarComponent } from './compartilhado/componentes/nav-bar/nav-bar.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { AutenticarComponent } from './paginas/autenticar/autenticar.component';
import { ContatosComponent } from './paginas/contatos/contatos.component';
import { BotaoBloquearLiberarComponent } from './compartilhado/componentes/botao-bloquear-liberar/botao-bloquear-liberar.component';
import { InputComponent } from './compartilhado/componentes/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    CadastroComponent,
    AutenticarComponent,
    ContatosComponent,
    BotaoBloquearLiberarComponent,
    InputComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
