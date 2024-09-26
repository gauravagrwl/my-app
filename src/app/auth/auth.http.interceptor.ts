import { HttpHandlerFn, HttpInterceptorFn, HttpParams, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

export function authHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  //const authToken = inject (AuthService).getAuthToken();
  // Clone the request to add the authentication header.
  // const newReq = req.clone({
  //   headers: {
  //     req.headers.append('X-Authentication-Token', 'token'),
  //   }
  // });
  // const newReq = req.clone({
  //   params: (req.params ? req.params : new HttpParams().set('userName', 'agrwl'))
  // });
  // console.log(newReq.params.getAll)
  const newReq = req.clone({
    setParams: {
      'userName': 'agrwlg'
    }
  });

  console.log('in authHttpInterceptor')
  return next(newReq);
}

// const newReq = req.clone({
//   params: (req.params ? req.params : new HttpParams())
//              .set('lang', localStorage.getItem('language')) /*.... add new params here .....*/ 
// });