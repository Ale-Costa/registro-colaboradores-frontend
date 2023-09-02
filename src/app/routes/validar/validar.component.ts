import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Colaborador } from 'src/app/shared/models/colaborador.model';
import { ColaboradorController } from 'src/app/shared/controllers/colaborador.controller';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ValidarDadosComponent } from './validar-dados/validar-dados.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-validar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule, ValidarDadosComponent],
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.scss'],
})
export class ValidarComponent implements OnInit {
  colaboradores: Colaborador[] = [];

  constructor(
    private readonly colaboradorController: ColaboradorController,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buscarColaboradores();
  }

  private buscarColaboradores(): void {
    this.colaboradorController.buscarTodos().pipe(take(1)).subscribe(this.definirColaboradores);
  }

  private definirColaboradores = (colaboradores: Colaborador[]) => {
    this.colaboradores = colaboradores;
  };

  abrirModalDados(colaborador: Colaborador): void {
    const dialogRef = this.dialog.open(ValidarDadosComponent, {
      data: colaborador,
      width: '50vh',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.buscarColaboradores()
    });
  }
}
