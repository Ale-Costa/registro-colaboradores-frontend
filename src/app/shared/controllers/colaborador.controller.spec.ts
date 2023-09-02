import { TestBed } from '@angular/core/testing';

import { ColaboradorController } from './colaborador.controller';

describe('ColaboradorService', () => {
  let service: ColaboradorController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColaboradorController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
