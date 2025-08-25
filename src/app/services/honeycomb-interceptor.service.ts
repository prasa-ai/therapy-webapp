import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class HoneycombInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        setTimeout(() => {
            console.log("done waiting...now calling http to backend")
            console.log('I intercepted this message')
        }, 2000);
        return  next.handle(req);
    }
}