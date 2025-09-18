import { Component, inject, input, signal } from '@angular/core';
import { AuthenticationApi } from '../authentication-api';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginCredentialsDTO } from '../../dto';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {

  private readonly authApi = inject(AuthenticationApi);
  protected readonly router = inject(Router);
  protected readonly snackBar = inject(MatSnackBar);
  protected readonly serverError = signal('');
  readonly redirectUrl = input<string>();

  protected readonly form = new FormGroup({
    email: new FormControl<string>('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl<string>('', {validators: [Validators.required, Validators.min(4)]}),
  });

  
  loginUser(credentials: LoginCredentialsDTO) {
    this.serverError.set('');
    this.authApi.login(credentials)
      .subscribe({
        next: () => {
          this.router.navigateByUrl(this.redirectUrl() ?? '/');
          this.snackBar.open('Connexion réussie', 'Ok', {duration: 5000})
        },
        error: (err) => {
          if(err.status == 403) {
            this.serverError.set('Les identifiants sont incorrects')
          } else {
            this.serverError.set("Erreur serveur");
          }
        }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return;
    }
    const credentials:LoginCredentialsDTO = {
      email: this.form.value.email!,
      password: this.form.value.password!
    }

    this.loginUser(credentials);
  }

}
