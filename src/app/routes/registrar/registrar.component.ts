import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/shared/models/colaborador.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ColaboradorController } from 'src/app/shared/controllers/colaborador.controller';
import { take, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';

type ColaboradorForm = {
  nome: FormControl<string>;
  email: FormControl<string>;
  cpf: FormControl<string>;
  celular: FormControl<string | null>;
  conhecimentos: FormControl<string[]>;
};

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
})
export class RegistrarComponent {
  formGroup: FormGroup<ColaboradorForm>;
  loadingButton: boolean;
  readonly conhecimentos = ['Git', 'React', 'PHP', 'NodeJS', 'DevOps', 'Banco de Dados', 'TypeScript'];

  constructor(
    private readonly colaboradorController: ColaboradorController,
    private readonly fb: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
    private readonly route: ActivatedRoute
  ) {
    this.formGroup = this.buildFormGroup();
  }

  private buildFormGroup(): FormGroup {
    const nomeColaborador = this.route.snapshot.paramMap.get('colaborador') || '';

    return this.fb.group({
      nome: [nomeColaborador, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      celular: [],
      conhecimentos: [[], [Validators.required]],
    });
  }

  private get colaborador(): Colaborador {
    return this.formGroup.value as Colaborador;
  }

  registrar() {
    this.loadingButton = true;
    this.colaboradorController
      .registrarColaborador(this.colaborador)
      .pipe(
        take(1),
        tap({
          error: () => (this.loadingButton = false),
          complete: () => (this.loadingButton = false),
        })
      )
      .subscribe({
        next: () =>
          this.matSnackBar.open('Registrado com sucesso', 'OK', {
            duration: 5000,
          }),
        error: ({ error }) => {
          const erro = error.message || 'Erro desconhecido';
          this.matSnackBar.open(erro, 'OK', { duration: 10000 });
        },
      });
  }
}
