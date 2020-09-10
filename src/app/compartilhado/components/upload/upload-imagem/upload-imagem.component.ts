import { Component, Output, Input, EventEmitter, ViewChild } from '@angular/core';

// Servico
import { ModalServico } from '../../modal';

/*
* Componete para "upload" de imagem. Quando e selecionada uma imagem a mesma e convertida para base 64 e enviada para o Componente que esta
* utilizando. Esse componente so permiti imagems com as extensoes jpg, jpeg e png de acordo com o tamanho definido na propriedade
* tamanhoMaxArquivoBytes.
* Ex.:
* <app-upload-imagem (escolherArquivo)="nomeMetodoParaManipularArquivoSelecionado($event)">
* </app-upload-imagem>
*/
@Component({
  selector: 'app-upload-imagem',
  templateUrl: './upload-imagem.component.html',
  styleUrls: ['./upload-imagem.component.scss']
})
export class UploadImagemComponent {

  private readonly NO_IMAGE: string = 'https://aplicativos.tray.com.br/views/assets/images/no-photo-available.png?hash=1';

  @Output()
  escolherArquivo = new EventEmitter<string>();

  @Input()
  imgBase64?: string = this.NO_IMAGE;

  @Input()
  tamanhoMaxArquivoBytes?: number = 5000000; // 50KB

  @ViewChild('inputUpload')
  inputUpload: any;

  labelCampoUpload: string = 'Selecione a imagem';

  constructor(
    private modalServico: ModalServico
  ) { }

  alterandoArquivoSelecionado(listaArquivo: FileList): void {
    let arquivo: File = listaArquivo.item(0);
    if (!arquivo) {
      this.limparCampos();
    } else {
      if (this.isNaoImagem(arquivo)) {
        this.inputUpload.nativeElement.value = '';
        this.modalServico.exibirMensagem('Só é permitido selecionar imagem que tem uma das seguintes extensões: jpg, jpeg e png.');
        this.limparCampos();
      } else if (arquivo.size > this.tamanhoMaxArquivoBytes) {
        this.modalServico.exibirMensagem(`A imagem excedeu excedeu o tamanho máximo permitido de ${this.tamanhoMaxArquivoBytes} bytes.`);
        this.limparCampos();
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(arquivo);
        reader.onload = () => {
          this.imgBase64 = reader.result as string
          this.configurarNomesArquivoSelecionado(listaArquivo);
          this.escolherArquivo.emit(this.imgBase64);
        };
        reader.onerror = (error) => {
          this.modalServico.exibirMensagem('Ocorreu um erro ao selecionar a imagem: ' + arquivo.name + '.');
          console.log('Error: ', error);
        };
      }
    }
  }

  limparCampos(): void {
    this.inputUpload.nativeElement.value = '';
    this.labelCampoUpload = 'Selecione a imagem';
    this.imgBase64 = this.NO_IMAGE;
    this.escolherArquivo.emit(null);
  }

  private isNaoImagem(arquivo: File): boolean {
    let extensoesPermitidas = /(\.jpg|\.jpeg|\.png)$/i;
    return !extensoesPermitidas.exec(arquivo.name);
  }

  private configurarNomesArquivoSelecionado(listaArquivo: FileList): void {
    if (listaArquivo.length === 0) {
      this.labelCampoUpload = 'Selecione a imagem';
    } else {
      this.labelCampoUpload = Array.from(listaArquivo).map(f => f.name).join(', ');
    }
  }

}
