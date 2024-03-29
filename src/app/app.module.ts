import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Terceiros
import { NgxSpinnerModule } from 'ngx-spinner';

// Servicos
import { ModalServico } from 'src/app/compartilhado/components/modal/modal.servico';
import { FaceAuthService } from 'src/app/compartilhado/services/face-auth.service';

// Ngx
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { WebcamModule } from 'ngx-webcam';

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
import { UploadArquivoComponent } from './compartilhado/components/upload/upload-arquivo/upload-arquivo.component';
import { InputComponent } from './compartilhado/components/input/input.component';
import { UploadImagemComponent } from './compartilhado/components/upload/upload-imagem/upload-imagem.component';
import { WebcamComponent } from './compartilhado/components/webcam/webcam.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = undefined;

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
    SpinnerComponent,
    UploadArquivoComponent,
    InputComponent,
    UploadImagemComponent,
    WebcamComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    WebcamModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ModalServico, FaceAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
