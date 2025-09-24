import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { User } from '../../shared/entities';
import { catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginCredentialsDTO, UserRegisterDTO } from '../dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApi {

  private readonly http = inject(HttpClient);
  readonly user = signal<User|null>(null);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);



  constructor() {
    const userString = localStorage.getItem('user');
      if(userString && userString !== 'undefined'){
        this.user.set(
          JSON.parse(localStorage.getItem('user') || '{}')
        )
      }
  }

  register(credentials:UserRegisterDTO) {
    return this.http.post<User>(environment.serverUrl + '/api/user', credentials);
  }
  

  login(credentials:LoginCredentialsDTO) {
    return this.http.get<User>(environment.serverUrl + '/api/account', {
      headers: {
        'Authorization': 'Basic ' + btoa(credentials.email + ':' + credentials.password)
      },
      withCredentials: true
    })
      .pipe(
        tap(res => {
          if(res) {
            localStorage.setItem('user', JSON.stringify(res));
            this.user.set(res);
          }
        })
      );
  }
  
/*   login(credentials: LoginCredentialsDTO) {
    return this.http.get<User>(environment.serverUrl + '/api/account', {
      headers: {
        'Authorization': 'Basic ' + btoa(credentials.email + ':' + credentials.password)
      },
      withCredentials: true
    }).pipe(
      tap(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.user.set(res);
      })
    );
  } */

  reRouteToLogin() {
    this.logout();
    this.router.navigate(['login']);
    this.snackBar.open('Votre session a expiré, connectez-vous à nouveau', 'ok', {duration: 5000});
  }


// no refresh for the moment
/*   refreshToken() {
    return this.http.post<{message:string}>('/api/refresh-token', null, {withCredentials: true})
      .pipe(
        tap(res => localStorage.setItem('token', res.message)),
        catchError(err => {
          if(err.status == 403) {
            this.logout();
            this.router.navigate(['register']);
            this.snackBar.open('Your session has expired, please login again', 'ok', {duration: 5000});
          }
        throw err;
      })
    );
  }
 */

  logout() {
    this.user.set(null);
    localStorage.clear();
    return this.http.post<null>(environment.serverUrl + '/api/logout', null);
  }

  get isLogged() {
    return this.user() !== null;
  }


/*   private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length);
      }
    }
    return null;
  } */
  
}

