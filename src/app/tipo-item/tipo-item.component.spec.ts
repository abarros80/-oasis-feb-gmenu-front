import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoItemComponent } from './tipo-item.component';

describe('TipoItemComponent', () => {
  let component: TipoItemComponent;
  let fixture: ComponentFixture<TipoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
