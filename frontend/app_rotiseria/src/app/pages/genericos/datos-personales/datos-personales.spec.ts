import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPersonales } from './datos-personales';

describe('DatosPersonales', () => {
  let component: DatosPersonales;
  let fixture: ComponentFixture<DatosPersonales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosPersonales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPersonales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
