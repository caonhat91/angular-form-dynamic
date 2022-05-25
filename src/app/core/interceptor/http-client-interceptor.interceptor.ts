import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { forwardRef, Inject, Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { XSRF_HEADER_NAME } from 'src/app/app.module';

export const HTTP_CLIENT_INTERCEPTOR: Provider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: forwardRef(() => HttpClientInterceptor),
    multi: true
}

@Injectable({
    providedIn: 'root'
})
export class HttpClientInterceptor implements HttpInterceptor {

    constructor(@Inject(XSRF_HEADER_NAME) private xsrfHeaderToken: string, private tokenExtractor: HttpXsrfTokenExtractor) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const csrfToken = this.tokenExtractor.getToken();
        console.log(this.xsrfHeaderToken, csrfToken);
        if (csrfToken && !request.headers.has(this.xsrfHeaderToken)) {
            request = request.clone({ headers: request.headers.set(this.xsrfHeaderToken, csrfToken) });
        }
        return next.handle(request);
    }
}
