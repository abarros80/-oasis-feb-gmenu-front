import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoConjuntoComponent } from './tipo-conjunto.component';

describe('TipoConjuntoComponent', () => {
  let component: TipoConjuntoComponent;
  let fixture: ComponentFixture<TipoConjuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoConjuntoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoConjuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
