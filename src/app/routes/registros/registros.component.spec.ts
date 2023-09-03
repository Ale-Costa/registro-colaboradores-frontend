import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosComponent } from './registros.component';

describe('ValidarComponent', () => {
  let component: RegistrosComponent;
  let fixture: ComponentFixture<RegistrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistrosComponent]
    });
    fixture = TestBed.createComponent(RegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
