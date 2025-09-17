import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const clone = req.clone({
    setHeaders : {
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
  })
  return next(clone);

};
