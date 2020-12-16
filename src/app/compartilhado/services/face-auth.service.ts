import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// Utils
import { AppHttpUtil } from 'src/app/compartilhado/utils/app-http-util';

// Modelos
import { Cadastro } from 'src/app/compartilhado/models/face_auth.model';
import { TipoResposta } from '../enum/tipo_resposta.enum';

@Injectable({
  providedIn: 'root'
})

export class FaceAuthService {

  private readonly URL_LOCAL_API: string = 'http://127.0.0.1:5000';
  private readonly URL_WEB_API: string = 'https://back-end-face-auth.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  cadastrarUsuario(dadosUsuario: Cadastro, arquivo: Array<File>): Observable<HttpEvent<string>> {
    return this.httpClient.request(
      AppHttpUtil.criarHttpRequest(
        arquivo, `${this.URL_WEB_API}/cadastro/cadastrar-usuario`, dadosUsuario, TipoResposta.TEXT
      )
    );
  }

  autenticarUsuario(imagemB64: string): Observable<string> {
    return this.httpClient.post(
      `${this.URL_WEB_API}/autenticacao/autenticar-usuario`, { 'imagem': imagemB64 }, { responseType: TipoResposta.TEXT }
    );
  }

  getArtigo(): Observable<string> {
    return this.httpClient.get(`${this.URL_WEB_API}/artigo/`, { responseType: TipoResposta.TEXT });
  }

}
