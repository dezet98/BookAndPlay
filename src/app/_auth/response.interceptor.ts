import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GeneralService } from '../_services/general.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private generalService: GeneralService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              console.log('Correct response');
            }
          }, error => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                this.router.navigate(['signIn']);
                this.generalService.showSnackbar('You don\'t have permission to access this resource', 'Close');
              }
            }
          }));
  }
}
