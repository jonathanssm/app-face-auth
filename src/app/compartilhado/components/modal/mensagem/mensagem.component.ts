import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html'
})
export class MensagemComponent {

  public listaMsg: string[] = [];

  public classIconeCor: string;
  public tipoBotao: string;

  constructor(public bsModalRef: BsModalRef) { }

  fecharModal(): any {
    this.listaMsg = [];
    this.classIconeCor = '';
    this.tipoBotao = '';
    this.bsModalRef.hide();
  }
}
