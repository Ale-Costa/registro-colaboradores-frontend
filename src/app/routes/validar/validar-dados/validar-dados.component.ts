import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { ColaboradorController } from 'src/app/shared/controllers/colaborador.controller';
import { Colaborador } from 'src/app/shared/models/colaborador.model';

@Component({
  selector: 'app-validar-dados',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './validar-dados.component.html',
  styleUrls: ['./validar-dados.component.scss']
})
export class ValidarDadosComponent {
  constructor(
    public dialogRef: MatDialogRef<ValidarDadosComponent>,
    private readonly colaboradorController: ColaboradorController,
    private readonly matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public colaborador: Colaborador,
  ) {}

  validar(){
    this.colaboradorController.validarColaborador(this.colaborador.id).pipe(take(1)).subscribe({
      next: () => {
        this.matSnackBar.open('Validado com sucesso', 'OK', {
          duration: 5000,
        }),
        this.dialogRef.close();
      },
      error: ({ error }) => {
        const erro = error.message || 'Erro desconhecido';
        this.matSnackBar.open(erro, 'OK', { duration: 10000 });
      },
    });
  }
}
