import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalimbaComponent } from './kalimba.component';

describe('KalimbaComponent', () => {
  let component: KalimbaComponent;
  let fixture: ComponentFixture<KalimbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KalimbaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KalimbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
