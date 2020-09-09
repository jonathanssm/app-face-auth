import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

// Terceiros
import { NgxSpinnerModule } from 'ngx-spinner';

// Servicos
import { ModalServico } from 'src/app/compartilhado/components/modal/modal.servico';

// Ngx
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './paginas/home/home.component';
import { NavBarComponent } from './compartilhado/components/nav-bar/nav-bar.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { AutenticarComponent } from './paginas/autenticar/autenticar.component';
import { ContatosComponent } from './paginas/contatos/contatos.component';
import { BotaoBloquearLiberarComponent } from './compartilhado/components/botao-bloquear-liberar/botao-bloquear-liberar.component';
import { ConfirmacaoComponent } from './compartilhado/components/modal/confirmacao/confirmacao.component';
import { MensagemComponent } from './compartilhado/components/modal/mensagem/mensagem.component';
import { SpinnerComponent } from './compartilhado/components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    CadastroComponent,
    AutenticarComponent,
    ContatosComponent,
    BotaoBloquearLiberarComponent,
    ConfirmacaoComponent,
    MensagemComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ModalServico],
  bootstrap: [AppComponent]
})
export class AppModule { }
