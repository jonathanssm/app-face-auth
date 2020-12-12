import { Component, OnInit } from '@angular/core';

// Util
import { AppRelatorioUtil } from 'src/app/compartilhado/utils/app-relatorio-util';

// Servicos
import { FaceAuthService } from 'src/app/compartilhado/services/face-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private faceAuthServico: FaceAuthService,
    private spinnerServico: NgxSpinnerService
  ) { }

  ngOnInit(): void { }

  getArtigo(): void {
    this.spinnerServico.show();
    this.faceAuthServico.getArtigo().subscribe(resposta => {
      const blob: Blob = AppRelatorioUtil.converterB64ParaBlob(resposta, 'application/pdf');
      AppRelatorioUtil.downloadPdf(blob);
      this.spinnerServico.hide();
    });
  }

}
