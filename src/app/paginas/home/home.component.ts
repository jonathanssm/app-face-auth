import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Terceiros
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private spinnerServico: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  redirecionarCadastro(): void {
    this.router.navigate(['/cadastro']);
  }

  redirecionarAutenticar(): void {
    this.router.navigate(['/autenticar']);
  }

}
