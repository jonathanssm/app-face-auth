import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';

// Constante
import { Constante } from 'src/app/Constante';

// Terceiros
import { NgxSpinnerService } from 'ngx-spinner';

// Servicos
import { ModalServico } from 'src/app/compartilhado/components/modal';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public readonly TAMANHO_ARQUIVO_64MB: number = 67108864;

  public form: FormGroup;
  public eventoUploadProgresso: EventEmitter<Array<any>> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private spinnerServico: NgxSpinnerService,
    private modalServico: ModalServico,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.iniciarForm();
  }

  selecionarImagem(foto: FileList): void {
    if (foto == null) {
      this.form.controls.foto.setValue(null);
    } else {
      this.form.controls.foto.setValue(foto);
    }
  }

  selecionarArquivo(foto: Array<File>): void {
    if (foto.length === 0) {
      this.form.controls.foto.setValue(null);
    } else {
      this.form.controls.foto.setValue(foto[0]);
    }
  }

  cadastrarPessoa(): void {
    const foto: Array<File> = this.form.controls.foto.value == null ? [] : [this.form.controls.foto.value];
    this.modalServico.exibirConfirmacaoGrande('Realmente deseja finalizar o cadastro?', null, () => {
      this.spinnerServico.show();
      this.tratarResposta(foto);
    });
  }

  private tratarResposta(foto: Array<File>): void {
    const nomePessoa = this.form.get('nome').value;

    this.eventoUploadProgresso.emit([foto]);

    setTimeout(() => {
      this.spinnerServico.hide();
      this.modalServico.exibirSucesso(`${nomePessoa} você foi cadastrado(a) com sucesso.`);
      this.router.navigate(['home']);
    }, 4000);
  }

  /*private tratarResposta(evento: HttpEvent<any>, foto: Array<File>): void {
    this.eventoUploadProgresso.emit([evento, foto]);

    if (evento.type == HttpEventType.Response) {
      if (evento.body != null) {
        this.spinnerServico.hide();
        this.modalServico.exibirMensagem('Pessoa cadastrada com sucesso.');
        this.form.reset();
      }
    }
  }*/

  private iniciarForm(): void {
    this.form = this.formBuilder.group({
      cpf: this.formBuilder.control('', [Validators.required, Validators.pattern(Constante.REGEX_VALIDACAO_CPF_SEM_MASCARA)]),
      nome: this.formBuilder.control('', [Validators.required, Validators.pattern(Constante.REGEX_VALIDACAO_NOME)]),
      foto: this.formBuilder.control(null, Validators.required)
    });
  }

}
