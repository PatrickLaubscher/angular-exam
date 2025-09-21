import { Component, inject, signal } from '@angular/core';
import { AuthenticationApi } from '../../api/authentication/authentication-api';
import { User } from '../../shared/entities';

@Component({
  selector: 'app-account-main-page',
  imports: [],
  templateUrl: './account-main-page.html',
  styleUrl: './account-main-page.css'
})
export class AccountMainPage {

  protected readonly auth = inject(AuthenticationApi);
  
  constructor() {
    console.log(this.auth.user());
  }

}
