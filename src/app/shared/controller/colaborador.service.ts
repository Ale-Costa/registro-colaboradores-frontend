import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Colaborador } from '../models/colaborador.model';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private readonly http: HttpClient) { }

  registrarColaborador(colaborador: Colaborador): Observable<Colaborador>{
    return this.http.post<Colaborador>('/api/colaborador', colaborador);
  }

  validarColaborador(colaborador: Colaborador): Observable<Colaborador>{
    return this.http.post<Colaborador>(`/api/colaborador/${colaborador.cpf}`, colaborador);
  }
}
