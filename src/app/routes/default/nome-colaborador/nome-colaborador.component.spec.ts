import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomeColaboradorComponent } from './nome-colaborador.component';

describe('NomeColaboradorComponent', () => {
  let component: NomeColaboradorComponent;
  let fixture: ComponentFixture<NomeColaboradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NomeColaboradorComponent]
    });
    fixture = TestBed.createComponent(NomeColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
