import { Component, Input, Output, EventEmitter, AfterViewInit, OnInit } from '@angular/core';

/*
* Compoente q exibe um button do tipo especificado so q quando o atributo liberar for true o botao e desbloqueado e fica
* preto e quando bloquear for true o botao fica cinza com o cursor difenreciando e o botao fica desabilitado.
* OBS.: Deve somente ser utilizado em situacoes que e preciso ir ao back-end para realizar a acao do click
* Forma de utilizar:
* <app-botao-bloquear-liberar
*   typeBotao="buttonOuSubmmit"
*   nomeBotao="Nomde do Botao"
*   iconeFa"fa-search"
*   [liberar]="funcaoOuPropriedadeBoolean"
*   [bloquear]="ifuncaoOuPropriedadeBoolean"
*   classComplementar="Classe adicional q sera aplicada no button"
*   (eventoClick)="metodoQIraSerChamado(valorFormOuNada)"></app-botao-bloquear-liberar>
*/

@Component({
  selector: 'app-botao-bloquear-liberar',
  templateUrl: './botao-bloquear-liberar.component.html',
  styleUrls: ['./botao-bloquear-liberar.component.scss']
})

export class BotaoBloquearLiberarComponent implements AfterViewInit, OnInit {

  @Input() typeBotao: string;
  @Input() liberar: boolean;
  @Input() bloquear: boolean;
  @Input() nomeBotao?: string = undefined;
  @Input() classComplementar?: string;
  @Input() iconeFa?: string = undefined;

  @Output() eventoClick?: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.typeBotao = 'button';
    this.classComplementar = '';
  }

  ngAfterViewInit(): void {
    if (this.nomeBotaoNaoInformado() && this.iconeNaoInformado()) {
      throw new Error('Deve ser informado a nome do botao e/ou o icone');
    }
  }

  click(evento: any): void {
    this.eventoClick.emit(evento);
  }

  exibirIcone(): boolean {
    return this.iconeFa !== undefined && this.iconeFa != null && this.iconeFa.trim().length > 0;
  }

  private nomeBotaoNaoInformado(): boolean {
    return !(this.nomeBotao != undefined && this.nomeBotao != null && this.nomeBotao.trim().length > 0);
  }

  private iconeNaoInformado(): boolean {
    return !this.exibirIcone();
  }
}
