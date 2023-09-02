import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NomeColaboradorComponent } from './nome-colaborador/nome-colaborador.component';
import { TransformarParametro } from 'src/app/shared/utils/transformar-parametro/transformar-parametro';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, MatButtonModule, NomeColaboradorComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  registrar(): void {
    const dialogRef = this.dialog.open(NomeColaboradorComponent, {
      width: '30vw',
    });

    dialogRef.afterClosed().subscribe((nome) => {
      const nomeSemHifen = TransformarParametro.transformarNomeParaParametroRota(nome);
      this.router.navigate([`${nomeSemHifen}`, 'registrar']);
    });
  }
  validar(): void {
    this.router.navigate(['validar']);
  }
}
