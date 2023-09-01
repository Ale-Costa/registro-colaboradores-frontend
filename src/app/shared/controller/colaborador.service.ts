import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../models/colaborador.model';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private readonly http: HttpClient) { }

  registrarColaborador(colaborador: Colaborador): Observable<void>{
    return this.http.post<void>('/api/colaborador', colaborador);
  }

  validarColaborador(colaborador: Colaborador): Observable<void>{
    return this.http.post<void>(`/api/colaborador/${colaborador.cpf}`, colaborador);
  }
}
