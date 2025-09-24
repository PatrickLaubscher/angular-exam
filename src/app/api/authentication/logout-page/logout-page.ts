import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationApi } from '../authentication-api';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout-page',
  imports: [],
  templateUrl: './logout-page.html',
  styleUrl: './logout-page.css'
})
export class LogoutPage implements OnInit {

  protected readonly auth = inject(AuthenticationApi);
  protected readonly router = inject(Router);
  protected readonly snackBar = inject(MatSnackBar);


  ngOnInit(): void {
    this.auth.logout().subscribe({
      next: () => {
        this.snackBar.open('Vous avez été déconnecté', 'Ok', { duration: 5000 });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.snackBar.open('Erreur lors de la déconnexion', 'Ok', { duration: 5000 });
      }
    });
  }
}
