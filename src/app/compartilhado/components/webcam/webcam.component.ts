import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// NGX
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

// Servicos
import { ModalServico } from '../modal';

/**
 *
 * Documentacao: https://www.npmjs.com/package/ngx-webcam
 *
 */
@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {

  @Input() public largura?: number;
  @Input() public altura?: number;

  @Output() public imagemCapturada = new EventEmitter<WebcamImage>();

  private trigger: Subject<void> = new Subject<void>();

  constructor(
    private modalServico: ModalServico
  ) { }

  ngOnInit(): void {
    this.configurarDimensao();
  }

  capturarImagem(imagemCapturada: WebcamImage): void {
    this.imagemCapturada.emit(imagemCapturada);
  }

  exibirErro(error: WebcamInitError): void {
    if (error.mediaStreamError && (error.mediaStreamError.name === 'NotAllowedError' || error.mediaStreamError.name === 'NotFoundError')) {
      this.modalServico.exibirInfo(`Para realizar a autenticação o uso de uma camera ou webcam é necessario, se
                                    a mesma estiver conectada, favor verificar se o uso da camera na página foi autorizado.`);
      document.getElementById('camera').style.display = 'none';
    }
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  private configurarDimensao(): void {
    if (this.altura) {
      this.altura = this.altura;
    } else {
      this.altura = 500;
    }

    if (this.largura) {
      this.largura = this.largura;
    } else {
      this.largura = 500;
    }
  }

}
