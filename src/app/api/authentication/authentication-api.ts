import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../shared/entities';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginCredentialsDTO, UserRegisterDTO } from '../dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApi {

  private readonly http = inject(HttpClient);
  readonly user = signal<User|null>(null);


  constructor() {
    const userString = localStorage.getItem('user');
      if(userString && userString !== 'undefined'){
        this.user.set(
          JSON.parse(localStorage.getItem('user') || '{}')
        )
      }
  }

  register(dto:UserRegisterDTO) {
    return this.http.post<User>(environment.serverUrl + '/api/user', dto);
  }

  
  login(credentials: LoginCredentialsDTO) {
    return this.http.get<User>(environment.serverUrl + '/api/account', {
      headers: {
        'Authorization': 'Basic ' + btoa(credentials.email + ':' + credentials.password)
      },
      withCredentials: true
    }).pipe(
      tap(res => {
        localStorage.setItem('user', JSON.stringify(res));
        console.log(res);
        this.user.set(res);
      })
    );
  }


  logout() {
    this.user.set(null);
    localStorage.clear();
    return this.http.post<null>(environment.serverUrl + '/api/logout', null);
  }

  get isLogged() {
    return this.user() !== null;
  }
  
}

