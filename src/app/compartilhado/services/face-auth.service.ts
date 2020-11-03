import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { from, Observable } from 'rxjs';

// Utils
import { AppHttpUtil } from 'src/app/compartilhado/utils/app-http-util';

// Modelos
import { Cadastro } from 'src/app/compartilhado/models/face_auth.model';
import { TipoResposta } from '../enum/tipo_resposta.enum';

@Injectable({
  providedIn: 'root'
})

export class FaceAuthService {

  private readonly URL_API: string = 'http://127.0.0.1:5000';

  constructor(private httpClient: HttpClient) { }

  getTest(dadosUsuario: Cadastro, arquivo: Array<File>): Observable<HttpEvent<string>> {
    return this.httpClient.request(
      AppHttpUtil.criarHttpRequest(
        arquivo, `${this.URL_API}/cadastro/cadastrar-usuario`, dadosUsuario, TipoResposta.TEXT
      )
    );
  }

}
