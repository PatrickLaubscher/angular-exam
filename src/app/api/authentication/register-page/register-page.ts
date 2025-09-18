import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { confirmPasswordValidator } from '../validators';
import { UserRegisterDTO } from '../../dto';
import { AuthenticationApi } from '../authentication-api';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})

export class RegisterPage {

  private readonly authApi = inject(AuthenticationApi);
  protected readonly router = inject(Router);
  protected readonly serverError = signal('');
  private readonly snackBar = inject(MatSnackBar);

  protected readonly form = new FormGroup({
    displayName: new FormControl<string>('', {validators: [Validators.required, Validators.min(4)]}),
    email: new FormControl<string>('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl<string>('', {validators: [Validators.required, Validators.min(4)]}),
    repeatPassword : new FormControl<string>('', {validators: [Validators.required]})
  }, 
  {validators: confirmPasswordValidator});

  
  registerNewUser(newUser: UserRegisterDTO) {
    this.serverError.set('');
    this.authApi.register(newUser)
      .subscribe({
        next: () => {
          this.snackBar.open('Votre compte été créé avec succès !', 'Ok', {duration: 5000});
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if(err.status == 400) {
            this.serverError.set('L\'email est utilisé dans un autre compte');
          } else {
            this.serverError.set("Error with server");
          }
        }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return;
    }
    const newUser:UserRegisterDTO = {
      displayName: this.form.value.displayName!,
      email: this.form.value.email!,
      password: this.form.value.password!
    }

    this.registerNewUser(newUser);
  }

}
