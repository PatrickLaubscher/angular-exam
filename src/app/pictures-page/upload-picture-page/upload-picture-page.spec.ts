import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPicturePage } from './upload-picture-page';

describe('UploadPicturePage', () => {
  let component: UploadPicturePage;
  let fixture: ComponentFixture<UploadPicturePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadPicturePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
