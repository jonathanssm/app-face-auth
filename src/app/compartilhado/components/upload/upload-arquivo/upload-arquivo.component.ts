import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';

import { HttpEventType, HttpEvent } from '@angular/common/http';

import { ModalServico } from '../../modal';

@Component({
  selector: 'app-upload-arquivo',
  templateUrl: './upload-arquivo.component.html',
  styleUrls: ['./upload-arquivo.component.scss']
})
export class UploadArquivoComponent implements OnInit {

  @Output()
  escolherArquivo = new EventEmitter<Array<File>>();

  @Output()
  uploadArquivoFinalizado = new EventEmitter<any>();

  @Input()
  eventoProgressoUpload: EventEmitter<Array<any>>;

  @Input()
  textoInicial: string = 'Escolha o arquivo';

  @Input()
  tamanhoMaxArquivoBytes?: number = 1048576; // 1MB

  @Input()
  permitirVariosArquivos?: boolean = null;

  @Input()
  id: string = 'arquivo';

  @ViewChild('inputUpload')
  inputUpload: any;

  tamanhoArquivo: number;
  bytesEnviados: number;
  percentualAtual: string;

  constructor(private modalServico: ModalServico) { }

  ngOnInit(): void {
    this.reiniciarUpload();
    this.eventoProgressoUpload.subscribe(e => this.atualizarProgressoUpload(e[0], e[1]));
  }

  private atualizarProgressoUpload(event: HttpEvent<any>, listaArquivo: Array<File>): void {
    if (event.type === HttpEventType.Sent) {
      this.reiniciarUpload();
      if (listaArquivo.length > 0) {
        this.tamanhoArquivo = listaArquivo.map((arquivo: File) => arquivo.size).reduce((sizeAcumulado: number, sizeAtual: number) => sizeAcumulado + sizeAtual);
      }
    } else if (event.type === HttpEventType.UploadProgress && listaArquivo.length > 0) {
      this.bytesEnviados = event.loaded;
      let percentual = Math.round(100 * event.loaded / event.total);
      this.percentualAtual = `${percentual}%`;
    } else if (event.type === HttpEventType.ResponseHeader && event.status !== 200) {
      this.inputUpload.nativeElement.value = '';
      this.alterandoArquivoSelecionado({ length: 0, item: (index: number): any => { } });
    } else if (event.type === HttpEventType.Response) {
      this.inputUpload.nativeElement.value = '';
      this.textoInicial = 'Escolha o arquivo';
      this.uploadArquivoFinalizado.emit(event.body);
    }
  }

  alterandoArquivoSelecionado(listaArquivoInput: FileList) {
    this.reiniciarUpload();
    this.escolherArquivo.emit(this.validarListaArquivo(listaArquivoInput));
  }

  private validarListaArquivo(listaArquivo: FileList): Array<File> {
    let listaNomeArquivoInvalidos: Array<string> = [];
    let listaArquivoValido: Array<File> = [];
    for (let i = 0; i < listaArquivo.length; i++) {
      let arquivo: File = listaArquivo.item(i);
      if (arquivo && (arquivo.size === 0 || arquivo.size > this.tamanhoMaxArquivoBytes)) {
        listaNomeArquivoInvalidos.push(arquivo.name);
      } else {
        listaArquivoValido.push(arquivo);
      }
    }

    if (listaNomeArquivoInvalidos.length === listaArquivo.length) {
      this.textoInicial = 'Escolha o arquivo';
      this.inputUpload.nativeElement.value = '';
    }

    if (listaNomeArquivoInvalidos.length > 0) {
      this.modalServico.exibirMensagem(`Os seguintes arquivos serão desconsiderados, pois excederam o tamanho máximo permitido de ${this.tamanhoMaxArquivoBytes} bytes ou estão vazios: ${listaNomeArquivoInvalidos}`);
    }

    this.configurarNomesArquivoSelecionado(listaArquivoValido);
    return listaArquivoValido;
  }

  private reiniciarUpload(): void {
    this.tamanhoArquivo = 1;
    this.bytesEnviados = 0;
    this.percentualAtual = '0%';
  }

  isZeroProgresso(): boolean {
    return this.bytesEnviados === 0;
  }

  private configurarNomesArquivoSelecionado(listaArquivo: Array<File>): void {
    if (listaArquivo.length === 0) {
      this.textoInicial = 'Escolha o arquivo';
    } else {
      this.textoInicial = listaArquivo.map(f => f.name).join(', ');
    }
  }

}
