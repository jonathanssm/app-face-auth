import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

// NGX
import { WebcamImage } from 'ngx-webcam';

// Servicos
import { FaceAuthService } from 'src/app/compartilhado/services/face-auth.service';
import { ModalServico } from 'src/app/compartilhado/components/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.component.html',
  styleUrls: ['./autenticar.component.scss']
})
export class AutenticarComponent implements OnInit {

  constructor(
    private faceAuthServico: FaceAuthService,
    private modalServico: ModalServico,
    private spinnerServico: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  autenticarUsuario(imagemCapturada: WebcamImage): void {
    this.spinnerServico.show();
    this.faceAuthServico.autenticarUsuario(imagemCapturada.imageAsBase64).subscribe(resposta => {
      this.tratarResposta(resposta);
      this.spinnerServico.hide();
    });
  }

  private tratarResposta(resposta: string): void {
    if (resposta === 'false') {
      this.modalServico.exibirErro('Ocorreu um erro durante a autenticação.');
    } else if (resposta === 'noFaces') {
      this.modalServico.exibirAtencao('Nenhum rosto foi detectado.');
    } else if (resposta === 'noOneFind') {
      this.modalServico.exibirAtencao('Pessoa não cadastrada.');
    } else {
      this.modalServico.exibirSucesso(resposta);
      this.router.navigate(['home']);
    }
  }

}
