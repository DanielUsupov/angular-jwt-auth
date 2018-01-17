import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const auth = this.injector.get(AuthService);

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
                console.log(event);
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                const router = this.injector.get(Router);
                if (err.status === 401) {
                    // redirect to the login route
                    // or show a modal
                    router.navigate(['/login']);
                }
            }
        });
    }

}
