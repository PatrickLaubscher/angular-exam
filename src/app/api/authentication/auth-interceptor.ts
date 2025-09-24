import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { AuthenticationApi } from './authentication-api';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const clone = req.clone({
    setHeaders : {
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
  })
  return next(clone);


  
/*   const auth = inject(AuthenticationApi);

  const platformId = inject(PLATFORM_ID);
  if(platformId!='browser' || !localStorage.getItem('token') || req.url.includes('refresh-token')) {
    return next(req);
  }

  return next(cloneWithBearer(req)).pipe(
    catchError(err => {
      if(err.status == 403) {

        auth.reRouteToLogin();

        return auth.refreshToken().pipe(
          concatMap(() => next(cloneWithBearer(req)))
        );

      };
      throw err;
    })
  ); */
   

/*   function cloneWithBearer(req:HttpRequest<unknown>) {
    return req.clone({
      setHeaders: {
        'Authorization' : 'Bearer' + localStorage.getItem('token')
      }
    });
  }
 */
// without refresh token
/*   const clone = req.clone({
    setHeaders : {
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
  })
  return next(clone);
 */

};