import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sesion } from './sesion';

describe('Sesion', () => {
  let component: Sesion;
  let fixture: ComponentFixture<Sesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sesion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
