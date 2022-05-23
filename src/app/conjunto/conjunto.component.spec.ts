import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjuntoComponent } from './conjunto.component';

describe('ConjuntoComponent', () => {
  let component: ConjuntoComponent;
  let fixture: ComponentFixture<ConjuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConjuntoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
