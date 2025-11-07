import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUser } from './ver-user';

describe('VerUser', () => {
  let component: VerUser;
  let fixture: ComponentFixture<VerUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
