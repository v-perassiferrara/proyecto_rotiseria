import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Promociones } from './promociones';

describe('Promociones', () => {
  let component: Promociones;
  let fixture: ComponentFixture<Promociones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Promociones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Promociones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
