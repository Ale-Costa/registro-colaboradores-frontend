import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './routes/registrar/components/registrar.component';
import { ValidarComponent } from './routes/validar/validar.component';

const routes: Routes = [
  {
    path: ':colaborador/registrar',
    component: RegistrarComponent,
  },
  {
    path: 'validar',
    component: ValidarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
