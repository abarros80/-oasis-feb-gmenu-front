import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalinasSeaComponent } from './salinas-sea.component';

describe('SalinasSeaComponent', () => {
  let component: SalinasSeaComponent;
  let fixture: ComponentFixture<SalinasSeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalinasSeaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalinasSeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
