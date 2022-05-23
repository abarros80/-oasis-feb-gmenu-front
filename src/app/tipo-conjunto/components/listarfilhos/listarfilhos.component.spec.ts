import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarfilhosComponent } from './listarfilhos.component';

describe('ListarfilhosComponent', () => {
  let component: ListarfilhosComponent;
  let fixture: ComponentFixture<ListarfilhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarfilhosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarfilhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
