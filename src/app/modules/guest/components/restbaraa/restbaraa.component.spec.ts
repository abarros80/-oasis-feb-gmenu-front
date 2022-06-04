import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestbaraaComponent } from './restbaraa.component';

describe('RestbaraaComponent', () => {
  let component: RestbaraaComponent;
  let fixture: ComponentFixture<RestbaraaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestbaraaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestbaraaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
