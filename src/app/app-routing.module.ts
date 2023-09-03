import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './routes/registrar/registrar.component';
import { DefaultComponent } from './routes/default/default.component';
import { RegistrosComponent } from './routes/registros/registros.component';
import { ValidarDadosComponent } from './routes/validar/validar-dados.component';

const routes: Routes = [
  {
    path: ':colaborador/registrar',
    component: RegistrarComponent,
  },
  {
    path: 'registros',
    component: RegistrosComponent,
  },
  {
    path: ':colaborador/validar',
    component: ValidarDadosComponent,
  },
  {
    path: '**',
    component:DefaultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
