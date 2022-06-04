import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortoGrandeComponent } from './porto-grande.component';

describe('PortoGrandeComponent', () => {
  let component: PortoGrandeComponent;
  let fixture: ComponentFixture<PortoGrandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortoGrandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortoGrandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
