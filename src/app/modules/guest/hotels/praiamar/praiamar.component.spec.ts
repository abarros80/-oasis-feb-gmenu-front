import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraiamarComponent } from './praiamar.component';

describe('PraiamarComponent', () => {
  let component: PraiamarComponent;
  let fixture: ComponentFixture<PraiamarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraiamarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PraiamarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
