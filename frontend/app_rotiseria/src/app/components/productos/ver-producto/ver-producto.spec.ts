import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProducto } from './ver-producto';

describe('VerProducto', () => {
  let component: VerProducto;
  let fixture: ComponentFixture<VerProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
