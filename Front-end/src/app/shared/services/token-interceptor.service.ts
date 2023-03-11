import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { DeskService } from './desk.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {

  intercept(req: any, next: any){
    let deskService = this.injector.get(DeskService);
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: 'Bearer ${deskService.getToken()}'
      }
    })
    return next.handle(tokenizedReq)
  }

  constructor(private injector: Injector) { }
}
