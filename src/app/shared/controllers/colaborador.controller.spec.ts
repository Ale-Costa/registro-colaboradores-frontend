import { TestBed } from '@angular/core/testing';
import { ColaboradorController } from './colaborador.controller';
import { HttpClient } from '@angular/common/http';

describe('ColaboradorService', () => {
  let service: ColaboradorController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: () => {},
            post: () => {},
            put: () => {},
          }
        }
      ]
    });
    service = TestBed.inject(ColaboradorController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
