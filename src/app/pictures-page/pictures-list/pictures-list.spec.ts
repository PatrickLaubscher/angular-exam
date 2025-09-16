import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesList } from './pictures-list';

describe('PicturesList', () => {
  let component: PicturesList;
  let fixture: ComponentFixture<PicturesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicturesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicturesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
