import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html'
})
export class MensagemComponent {

  listaMsg: string[] = [];

  classIconeCor: string;

  constructor(public bsModalRef: BsModalRef) { }

  fecharModal(): any {
    this.listaMsg = [];
    this.classIconeCor = '';
    this.bsModalRef.hide();
  }
}
