import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Colaborador } from 'src/app/shared/models/colaborador.model';
import { ColaboradorController } from 'src/app/shared/controllers/colaborador.controller';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { debounceTime, take } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-validar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    NgxMaskPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss'],
})
export class RegistrosComponent implements OnInit {
  colaboradores: Colaborador[] = [];
  pesquisaFormControl = new FormControl<string>('');

  constructor(
    private readonly colaboradorController: ColaboradorController,
    private readonly matSnackBar: MatSnackBar,

    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.buscarColaboradores();
    this.pesquisaChanges();
  }

  private buscarColaboradores(): void {
    this.colaboradorController
      .buscarTodos()
      .pipe(take(1))
      .subscribe({ next: this.definirColaboradores, error: this.mostrarErro });
  }

  private definirColaboradores = (colaboradores: Colaborador[]): void => {
    this.colaboradores = colaboradores;
  };

  private mostrarErro = ({ error }: any): void => {
    const erro = error.message || 'Erro desconhecido';
    this.matSnackBar.open(erro, 'OK', { duration: 10000 });
  };

  private pesquisaChanges(): void {
    this.pesquisaFormControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe({ next: value => this.buscarPorNome(value || ''), error: this.mostrarErro });
  }

  private buscarPorNome = (nome: string): void => {
    this.colaboradorController
      .buscarPorNome(nome)
      .subscribe({ next: this.definirColaboradores, error: this.mostrarErro });
  };

  abrirModalDados(colaborador: Colaborador): void {
    this.router.navigate([`${colaborador.nome}`, 'validar'], { queryParams: { id: colaborador.id } });
  }
}
