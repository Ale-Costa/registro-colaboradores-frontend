import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/shared/models/colaborador.model';

type ColaboradorForm = {
  nome: FormControl<string>;
  email: FormControl<string>;
  cpf: FormControl<number>;
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
  readonly conhecimentos: string[] = ['Git','React','PHP','NodeJS','DevOps','Banco de Dados','TypeScript']


  constructor(private readonly fb: FormBuilder) {
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

  registrar(){
    console.log('registrou');
  }
}
