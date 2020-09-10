import {
  Component, OnInit, Input, AfterViewInit, Output, EventEmitter,
  ChangeDetectorRef, ViewChild, ElementRef, OnDestroy, forwardRef
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// Constante
import { Constante } from 'src/app/Constante';

// Util
import { AppFormularioUtil } from 'src/app/compartilhado/utils/app-formulario.util';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  private static idInputContador: number = 0;

  @Input() textoPlaceHolder: string;
  @Input() mensagemErro: string;
  @Input() control: FormControl;
  @Input() tipo?: string = 'text';
  @Input() somenteLeitura?: boolean = false;
  @Input() classComplementar?: string = '';
  @Input() removerMascara?: boolean = true;
  @Input() tamanhoMax?: number = 524288;
  @Input() foco?: boolean = false;

  @Output() alterarValor: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('input') refInput: ElementRef;

  public complementoId: string = undefined;
  public valorFinalInput: any = null;
  public padraoCustomizado = null;

  private mascaraEstatica?: string = undefined;
  private componenteEstadoInicial = true;
  private valorNuncaAlterado: boolean = true;

  private propagarAlteracaoValor = (_: any) => { };

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.complementoId = `${++InputComponent.idInputContador}`;
  }

  ngAfterViewInit(): void {
    if (this.tipo !== 'password' && this.tipo !== 'text') {
      throw new Error('Tipo nao permitido ja existe um componente especifico para esse tipo.');
    }

    if (this.control === undefined) {
      throw new Error('Esse componente precisa ser usado com um FormControlName');
    }

    this.complementoId += AppFormularioUtil.getNomeFormControl(this.control);
    this.changeDetector.detectChanges();
  }

  campoValido(): boolean {
    return this.control.valid && (this.control.dirty || this.control.touched);
  }

  campoInvalido(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  writeValue(value: any): void {
    if (this.refInput === undefined) {
      this.changeDetector.detectChanges();
    }

    if (value && value !== null) {
      this.refInput.nativeElement.value = value;
      this.valorFinalInput = value;
      this.valorNuncaAlterado = false;
      this.control.markAsTouched();
    } else {
      this.refInput.nativeElement.value = '';
      this.valorNuncaAlterado = true;
    }
  }

  registerOnChange(fn: any): void {
    this.propagarAlteracaoValor = fn;
  }

  registerOnTouched(fn: any): void {
    // noop - verificar pq o touched n esta funcionando corretamente
  }

  get mascara(): string {
    return this.mascaraEstatica;
  }

  @Input()
  set mascara(novaMascara: string) {
    this.mascaraEstatica = undefined;
    this.padraoCustomizado = null;
    if (novaMascara.startsWith('L')) {
      this.configurarMascaraSomenteLetra(novaMascara);
    } else if (novaMascara.startsWith('i')) {
      this.configurarMascaraSomenteLetraMinusculaSemAcento(novaMascara);
    } else {
      this.configurarMascara(novaMascara);
    }
  }

  alteracaoNgModel(valor: any): void {
    if (this.componenteEstadoInicial && valor !== '') {
      this.atualizarValorFormControl(valor);
      this.componenteEstadoInicial = false;
    } else if (this.valorNuncaAlterado) {
      this.valorFinalInput = null;
    } else {
      this.atualizarValorFormControl(valor);
    }
    this.valorNuncaAlterado = false;
  }

  ngOnDestroy(): void {
    InputComponent.idInputContador--;
  }

  private atualizarValorFormControl(valor: any): void {
    this.valorFinalInput = valor;
    // vai propagar a alteração de valor para o form control para q seja possivel verificar se ele esta valido ou invalido
    this.propagarAlteracaoValor(valor);
    this.alterarValor.emit(valor);
  }

  private configurarMascaraSomenteLetra(novaMascara: string): void {
    this.padraoCustomizado = { L: { pattern: new RegExp(Constante.REGEX_VALIDACAO_NOME) } };
    this.mascaraEstatica = novaMascara;
    this.removerMascara = false;
  }

  private configurarMascaraSomenteLetraMinusculaSemAcento(novaMascara: string): void {
    this.padraoCustomizado = { i: { pattern: new RegExp('\[a-z\]') } };
    this.mascaraEstatica = novaMascara;
  }

  private configurarMascara(novaMascara: string): void {
    this.mascaraEstatica = novaMascara;
  }

}
