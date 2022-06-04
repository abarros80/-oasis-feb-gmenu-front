import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestbarccComponent } from './restbarcc.component';

describe('RestbarccComponent', () => {
  let component: RestbarccComponent;
  let fixture: ComponentFixture<RestbarccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestbarccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestbarccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
