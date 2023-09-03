import { TestBed } from '@angular/core/testing';
import { ColaboradorController } from './colaborador.controller';
import { HttpClient } from '@angular/common/http';
import { Colaborador } from '../models/colaborador.model';

describe('ColaboradorController', () => {
  let service: ColaboradorController;

  let httpClientMock: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientMock = jasmine.createSpyObj('HttpClient', ['post', 'put', 'get']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
      ],
    });
    service = TestBed.inject(ColaboradorController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Metodo: registrarColaborador', () => {
    const colaborador: Colaborador = {
      nome: 'Teste',
      conhecimentos: ['Teste'],
      cpf: '12345678900',
      email: 'teste@gmail.com',
      id: 10,
    };

    beforeEach(() => {
      service.registrarColaborador(colaborador);
    });

    it('Deve realizar post em /registrar passando o colaborador no corpo da requisiçao', () => {
      expect(httpClientMock.post).toHaveBeenCalledTimes(1);
      expect(httpClientMock.post).toHaveBeenCalledWith('http://localhost:3000/colaborador/registrar', colaborador);
    });
  });

  describe('Metodo: validarColaborador', () => {
    const id = 10;

    beforeEach(() => {
      service.validarColaborador(id);
    });

    it('Deve realizar put em /validar passando o id do colaborador no corpo da requisiçao', () => {
      expect(httpClientMock.put).toHaveBeenCalledTimes(1);
      expect(httpClientMock.put).toHaveBeenCalledWith(`http://localhost:3000/colaborador/validar/${id}`, {});
    });
  });

  describe('Metodo: invalidarColaborador', () => {
    const id = 10;

    beforeEach(() => {
      service.invalidarColaborador(id);
    });

    it('Deve realizar put em /invalidar passando o id por parametro', () => {
      expect(httpClientMock.put).toHaveBeenCalledTimes(1);
      expect(httpClientMock.put).toHaveBeenCalledWith(`http://localhost:3000/colaborador/invalidar/${id}`, {});
    });
  });

  describe('Metodo: buscarTodos', () => {
    beforeEach(() => {
      service.buscarTodos();
    });

    it('Deve realizar get na url base', () => {
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
      expect(httpClientMock.get).toHaveBeenCalledWith('http://localhost:3000/colaborador');
    });
  });

  describe('Metodo: buscaPorNome', () => {
    const nome = 'Teste'
    beforeEach(() => {
      service.buscarPorNome(nome);
    });

    it('Deve realizar get em /pesquisar passando o nome por parametro', () => {
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
      expect(httpClientMock.get).toHaveBeenCalledWith(`http://localhost:3000/colaborador/pesquisar/${nome}`);
    });
  });

  describe('Metodo: buscaPorId', () => {
    const id = 10
    beforeEach(() => {
      service.buscarPorId(id);
    });

    it('Deve realizar get em /pesquisar passando o nome por parametro', () => {
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
      expect(httpClientMock.get).toHaveBeenCalledWith(`http://localhost:3000/colaborador/${id}`);
    });
  });
});
