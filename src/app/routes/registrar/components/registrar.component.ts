import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/shared/models/colaborador.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColaboradorService } from 'src/app/shared/controller/colaborador.service';
import { map, take } from 'rxjs';

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

  colaborador: Colaborador
  formGroup: FormGroup<ColaboradorForm>
  loadingButton: boolean
  readonly conhecimentos: string[] = ['Git','React','PHP','NodeJS','DevOps','Banco de Dados','TypeScript']


  constructor(
    private readonly colaboradorService: ColaboradorService,
    private readonly fb: FormBuilder,
    private readonly matSnackBar: MatSnackBar,
    ) {
    this.formGroup = this.buildFormGroup()
  }

  private buildFormGroup():FormGroup {
    return this.fb.group({
      nome: ['',[Validators.required]],
      email: ['',[Validators.required]],
      cpf: ['',[Validators.required]],
      celular: [],
      conhecimentos: ['',[Validators.required]]
    })
  }

  private getBody(): Colaborador {
    return {...this.colaborador, ...this.formGroup.value} as Colaborador
  }

  registrar(){
    this.loadingButton = true
    this.colaboradorService.registrarColaborador(this.getBody()).pipe( take(1)).subscribe({
        next: () => this.matSnackBar.open('Registrado com sucesso','OK',{duration: 5000}),
        error: erro => this.matSnackBar.open(erro,'OK',{duration: 10000}),
    });
  }
}
