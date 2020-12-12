/*
* Esta classe deve conter somente metodos utilitarios para a geracao de relatorio
*/
export class AppRelatorioUtil {
  private constructor() {
    // somente metodos estaticos
  }

  public static downloadPdf(pdf: Blob): void {
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  public static downloadTexto(arquivoTexto: Blob): void {
    const blob = new Blob([arquivoTexto], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }


  /*
   * Efetua o download de um determinado blob
   * sem conhecer o tipo de extensão
   *
   */
  public static downloadTipoDesconhecido(arquivo: Blob, nomeArquivo: string): void {

    const link = document.createElement('a');
    link.download = nomeArquivo;
    link.href = window.URL.createObjectURL(arquivo);
    link.click();

  }

  public static converterB64ParaBlob(stringB64: string, tipoConteudoBlob: string): Blob {
    const caractereBytes = atob(stringB64);
    const arrayByte = [];

    for (let offset = 0; offset < caractereBytes.length; offset += 512) {
      const parteCaractererByte = caractereBytes.slice(offset, offset + 512);

      const byteNumbers = new Array(parteCaractererByte.length);
      for (let i = 0; i < parteCaractererByte.length; i++) {
        byteNumbers[i] = parteCaractererByte.charCodeAt(i);
      }

      const parteArrayByte = new Uint8Array(byteNumbers);

      arrayByte.push(parteArrayByte);
    }

    return new Blob(arrayByte, { type: tipoConteudoBlob });
  }
}
