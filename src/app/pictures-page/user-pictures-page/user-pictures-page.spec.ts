import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPicturesPage } from './user-pictures-page';

describe('UserPicturesPage', () => {
  let component: UserPicturesPage;
  let fixture: ComponentFixture<UserPicturesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPicturesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPicturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
