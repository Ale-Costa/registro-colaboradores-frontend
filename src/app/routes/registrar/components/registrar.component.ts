import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/shared/models/colaborador.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColaboradorController } from 'src/app/shared/controllers/colaborador.controller';
import { delay, map, take, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TransformarParametro } from 'src/app/shared/utils/transformar-parametro/transformar-parametro';

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
})
export class RegistrarComponent {
  formGroup: FormGroup<ColaboradorForm>;
  loadingButton: boolean;
  readonly conhecimentos: string[] = ['Git', 'React', 'PHP', 'NodeJS', 'DevOps', 'Banco de Dados', 'TypeScript'];

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
    const nomeLegivel = TransformarParametro.transformarParaNomeLegivel(nomeColaborador);

    return this.fb.group({
      nome: [nomeLegivel, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      celular: [],
      conhecimentos: ['', [Validators.required]],
    });
  }

  private get colaborador(): Colaborador {
    return this.formGroup.value as Colaborador;
  }
  buscar() {
    this.colaboradorController.buscarTodos().subscribe();
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
