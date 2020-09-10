import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html'
})
export class ConfirmacaoComponent {

  public listaMsg: string[] = [];
  public classIconeCor: string;
  public dados: any;

  public eventoConfirmado = new EventEmitter<string>();
  public eventoNaoConfirmado = new EventEmitter<string>();

  constructor(public bsModalRef: BsModalRef) { }

  confirmado(): void {
    this.eventoConfirmado.emit(this.dados);
    this.bsModalRef.hide();
  }

  naoConfirmado(): void {
    this.eventoNaoConfirmado.emit(this.dados);
    this.bsModalRef.hide();
  }
}
