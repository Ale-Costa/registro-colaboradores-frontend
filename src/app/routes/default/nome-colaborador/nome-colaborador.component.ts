import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nome-colaborador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './nome-colaborador.component.html',
  styleUrls: ['./nome-colaborador.component.scss']
})
export class NomeColaboradorComponent {
  nomeFormControl = new FormControl<string>('');

  constructor(
    public dialogRef: MatDialogRef<NomeColaboradorComponent>,
  ) {}
}
