import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../models/colaborador.model';

@Injectable({
  providedIn: 'root',
})
export class ColaboradorController {
  private readonly baseUrl = 'http://localhost:3000/colaborador';

  constructor(private readonly http: HttpClient) {}

  registrarColaborador(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(`${this.baseUrl}/registrar`, colaborador);
  }

  validarColaborador(id: number): Observable<Colaborador> {
    return this.http.put<Colaborador>(`${this.baseUrl}/validar/${id}`, {});
  }

  buscarTodos(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.baseUrl}`);
  }
}
