import { Injectable, Injector } from '@angular/core';

// Libs de terceiros
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

// Componentes
import { MensagemComponent } from '../modal/mensagem/mensagem.component';
import { ConfirmacaoComponent } from '../modal/confirmacao/confirmacao.component';

@Injectable()
export class ModalServico {

  private configPadrao: ModalOptions;

  constructor(private injector: Injector) {
    this.configPadrao = {
      animated: true,
      keyboard: true,
      backdrop: 'static' // nao fecha quando clica fora do modal
    };
  }

  exibirMensagem(mensagem: string): void {
    this.exibir('modal-dark', '', mensagem, MensagemComponent);
  }

  exibirSucesso(mensagem: string): void {
    this.exibir('modal-dark', 'fa-check text-dark', mensagem, MensagemComponent);
  }

  exibirAtencao(mensagem: string): void {
    this.exibir('modal-dark', 'fa-exclamation-triangle text-dark', mensagem, MensagemComponent);
  }

  exibirErro(mensagem: string): void {
    this.exibir('modal-danger', 'fa-times text-danger', mensagem, MensagemComponent);
  }

  exibirInfo(mensagem: string): void {
    this.exibir('modal-info', 'fa fa-info-circle text-info', mensagem, MensagemComponent);
  }

  /*
  * Este servico ira exibir um modal grande com os botoes sim e nao para q o usuario escolhe uma das opcoes.
  * Ver o comentario do metodo exibirConfirmacao para mais detalhes
  */
  exibirConfirmacaoGrande(mensagem: string, dados: any, funcaoConfirmado: Function, funcaoNaoConfirmado?: Function): void {
    this.configurarModalConfirmacao('modal-dark', mensagem, dados, funcaoConfirmado, funcaoNaoConfirmado);
  }

  private exibir(classModal: string, classIconeCor: string, mensagem: string, modalComponent: any): BsModalRef {
    let novaConfig = Object.assign({}, this.configPadrao, { class: classModal });
    let bsModalRef: BsModalRef = this.injector.get(BsModalService).show(modalComponent, novaConfig);
    bsModalRef.content.classIconeCor = classIconeCor;
    bsModalRef.content.listaMsg.push(mensagem);
    return bsModalRef;
  }

  private configurarModalConfirmacao(classModal: string, mensagem: string, dados: any, funcaoConfirmado: Function, funcaoNaoConfirmado?: Function): void {
    let modal = this.exibir(classModal, 'fa-exclamation-triangle text-dark', mensagem, ConfirmacaoComponent);
    modal.content.dados = dados;
    modal.content.eventoConfirmado.subscribe(funcaoConfirmado);
    if (funcaoNaoConfirmado) {
      modal.content.eventoNaoConfirmado.subscribe(funcaoNaoConfirmado);
    }
  }
}
