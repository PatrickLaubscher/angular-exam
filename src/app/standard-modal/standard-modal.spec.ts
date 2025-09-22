import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardModal } from './standard-modal';

describe('StandardModal', () => {
  let component: StandardModal;
  let fixture: ComponentFixture<StandardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
