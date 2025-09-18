import { Component, inject } from '@angular/core';
import { AuthenticationApi } from '../authentication-api';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout-page',
  imports: [],
  templateUrl: './logout-page.html',
  styleUrl: './logout-page.css'
})
export class LogoutPage {

  protected readonly auth = inject(AuthenticationApi);
  protected readonly router = inject(Router);
  protected readonly snackBar = inject(MatSnackBar);


  constructor() {

    this.auth.logout();
    this.router.navigate(['/']);
    this.snackBar.open('Vous avez été déconnecté', 'Ok', {duration: 5000});

  }

}
