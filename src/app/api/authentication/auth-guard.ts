import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationApi } from './authentication-api';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthenticationApi);
  const router = inject(Router);
  const snack = inject(MatSnackBar);

  if(auth.isLogged) {
    return true;
  }

  snack.open('Vous devez vous connecter ou créer un compte', 'Ok', {duration: 5000});

  return router.createUrlTree(['login'], {queryParams: { 
    redirectUrl: state.url
  }})


};
