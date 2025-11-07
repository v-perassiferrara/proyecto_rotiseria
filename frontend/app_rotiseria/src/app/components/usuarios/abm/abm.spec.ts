import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Abm } from './abm';

describe('Abm', () => {
  let component: Abm;
  let fixture: ComponentFixture<Abm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Abm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Abm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
