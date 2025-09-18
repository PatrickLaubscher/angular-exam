import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMainPage } from './account-main-page';

describe('AccountMainPage', () => {
  let component: AccountMainPage;
  let fixture: ComponentFixture<AccountMainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMainPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
