import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestbarbbComponent } from './restbarbb.component';

describe('RestbarbbComponent', () => {
  let component: RestbarbbComponent;
  let fixture: ComponentFixture<RestbarbbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestbarbbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestbarbbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
