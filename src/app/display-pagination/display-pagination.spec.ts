import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPagination } from './display-pagination';

describe('DisplayPagination', () => {
  let component: DisplayPagination;
  let fixture: ComponentFixture<DisplayPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayPagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayPagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
