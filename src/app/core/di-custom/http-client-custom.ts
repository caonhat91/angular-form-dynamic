import { HttpClient } from "@angular/common/http";
import { forwardRef, Injectable, Provider } from "@angular/core";
import { Observable, of } from "rxjs";

export const HTTP_CLIENT_CUSTOM: Provider = { provide: HttpClient, useClass: forwardRef(() => HttpClientCustom) };

@Injectable({
    providedIn: 'root'
})
export class HttpClientCustom extends HttpClient {
    mockUrl = './assets/mock';

    mock<T>(name: string): Observable<T> {
        if (!name) {
            return of();
        }
        if (!name.match(/.json$/gi)) {
            name = name + '.json';
        }
        return this.get<T>(`${this.mockUrl}/${name}`);
    }
}
