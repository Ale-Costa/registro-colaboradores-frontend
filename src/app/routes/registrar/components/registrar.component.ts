import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/shared/models/colaborador.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColaboradorController } from 'src/app/shared/controllers/colaborador.controller';
import { map, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TransformarParametro } from 'src/app/shared/utils/transformar-parametro/transformar-parametro';

type ColaboradorForm = {
  nome: FormControl<string>;
  email: FormControl<string>;
  cpf: FormControl<string>;
  celular: FormControl<number|null>;
  conhecimentos: FormControl<string[]>
}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {

  formGroup: FormGroup<ColaboradorForm>
  loadingButton: boolean
  readonly conhecimentos: string[] = ['Git','React','PHP','NodeJS','DevOps','Banco de Dados','TypeScript']


  constructor(
    private readonly colaboradorService: ColaboradorController,
    private readonly fb: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
    private readonly route: ActivatedRoute
    ) {
    this.formGroup = this.buildFormGroup()
  }

  private buildFormGroup():FormGroup {
    const nomeColaborador = this.route.snapshot.paramMap.get('colaborador') || ''
    const nomeLegivel = TransformarParametro.transformarParaNomeLegivel(nomeColaborador)

    return this.fb.group({
      nome: [nomeLegivel,[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      cpf: ['',[Validators.required]],
      celular: [],
      conhecimentos: ['',[Validators.required]]
    })
  }

  private get colaborador (): Colaborador{
    return this.formGroup.value as Colaborador
  }

  registrar(){
    this.loadingButton = true
    this.colaboradorService.registrarColaborador(this.colaborador).pipe( take(1)).subscribe({
        next: () => this.matSnackBar.open('Registrado com sucesso','OK',{duration: 5000}),
        error: erro => this.matSnackBar.open(erro,'OK',{duration: 10000}),
    });
  }
}
