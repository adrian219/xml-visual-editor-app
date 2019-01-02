import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
                private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                // location.reload(true);
                this.router.navigate(['/unauthorized']);
            }

            if(err.status === 403) {
                this.router.navigate(['/access-denied']);
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}