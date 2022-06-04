import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelorizonteComponent } from './belorizonte.component';

describe('BelorizonteComponent', () => {
  let component: BelorizonteComponent;
  let fixture: ComponentFixture<BelorizonteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BelorizonteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BelorizonteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
