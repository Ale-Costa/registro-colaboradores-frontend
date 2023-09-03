import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { take } from 'rxjs';
import { ColaboradorController } from 'src/app/shared/controllers/colaborador.controller';
import { Colaborador } from 'src/app/shared/models/colaborador.model';

@Component({
  selector: 'app-validar-dados',
  standalone: true,
  imports: [CommonModule, MatButtonModule, NgxMaskPipe],
  templateUrl: './validar-dados.component.html',
  styleUrls: ['./validar-dados.component.scss'],
})
export class ValidarDadosComponent implements OnInit {
  colaborador: Colaborador;
  constructor(
    private readonly colaboradorController: ColaboradorController,
    private readonly matSnackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscarColaborador();
  }

  private buscarColaborador(): void {
    const id = Number(this.activatedRoute.snapshot.queryParamMap.get('id'));

    this.colaboradorController.buscarPorId(id).subscribe({ next: this.definirColaborador, error: this.mostrarErro });
  }

  private definirColaborador = (colaborador: Colaborador) => {
    this.colaborador = colaborador;
  };

  private mostrarErro = ({ error }: any): void => {
    const erro = error.message || 'Erro desconhecido';
    this.matSnackBar.open(erro, 'OK', { duration: 10000 });
  };

  validar() {
    this.colaboradorController
      .validarColaborador(this.colaborador.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.matSnackBar.open('Validado com sucesso', 'OK', {
            duration: 5000,
          });
        },
        error: this.mostrarErro,
      });
  }

  invalidar() {
    this.colaboradorController
      .invalidarColaborador(this.colaborador.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.matSnackBar.open('Invalidado com sucesso', 'OK', {
            duration: 5000,
          });
        },
        error: this.mostrarErro,
      });
  }
}
