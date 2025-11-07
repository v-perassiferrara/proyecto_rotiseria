import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Titlebar } from './titlebar';

describe('Titlebar', () => {
  let component: Titlebar;
  let fixture: ComponentFixture<Titlebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Titlebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Titlebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
