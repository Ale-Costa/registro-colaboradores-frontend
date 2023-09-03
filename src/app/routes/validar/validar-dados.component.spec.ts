import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarDadosComponent } from './validar-dados.component';

describe('ValidarDadosComponent', () => {
  let component: ValidarDadosComponent;
  let fixture: ComponentFixture<ValidarDadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidarDadosComponent]
    });
    fixture = TestBed.createComponent(ValidarDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
