import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarComponent } from './routes/validar/validar.component';
import { RegistrarComponent } from './routes/registrar/registrar.component';
import { DefaultComponent } from './routes/default/default.component';

const routes: Routes = [
  {
    path: ':colaborador/registrar',
    component: RegistrarComponent,
  },
  {
    path: 'validar',
    component: ValidarComponent,
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
