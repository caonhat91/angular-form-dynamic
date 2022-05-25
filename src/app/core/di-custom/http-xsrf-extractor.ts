import { HttpXsrfTokenExtractor } from "@angular/common/http";
import { forwardRef, Inject, Injectable, PLATFORM_ID, Provider } from "@angular/core";
import { map } from 'rxjs/operators';
import { XSRF_HEADER_NAME } from "src/app/app.module";
import { HttpClientCustom } from "./http-client-custom";

export const HTTP_XSRF_EXTRACTOR: Provider = {
    provide: HttpXsrfTokenExtractor,
    useClass: forwardRef(() => HttpXsrfExtractor),
}

@Injectable({
    providedIn: 'root'
})
export class HttpXsrfExtractor implements HttpXsrfTokenExtractor {

    constructor(
        @Inject(PLATFORM_ID) private platform: string
    ) { }

    getToken(): string | null {
        if (this.platform != 'browser') {
            return null;
        }

        return Math.random().toString(36).substring(7);
    }
}
