import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, debounceTime, finalize, mergeMap, retry} from 'rxjs/operators';
import {AppService} from '../service/app.service';


/**
 * 全局HTTP请求拦截器
 */
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  public processingHttpCount = 0;

  constructor(public appService: AppService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (req.url.includes('/monitor')) {
    //   return next.handle(req);
    // }

    setTimeout(() => this.appService.showLoadingBar = true);
    this.processingHttpCount ++;
    return next.handle(req.clone({
      // url: req.url.replace('/starry', '/starry')
    }))
      .pipe(
        debounceTime(1000),
        // 失败时重试3次
        retry(3),
        mergeMap((event: any) => {
          if (event instanceof HttpResponseBase) {
            // HTTP返回代码正常

            if (event.status >= 200 && event.status < 400) {
              if (event instanceof HttpResponse) {
                const body = event.body;
                if (body && body.success) {
                  // 取出响应体数据的data部分
                  return of(new HttpResponse(Object.assign(event, {body: body.data})));
                } else {
                  throw Error(body.msg);
                }
              }
            }
          }
          return of(event);
        }), catchError((err: HttpErrorResponse) => {
          this.appService.showSnackBar(err.message, 4000);
          return throwError(err);
        }), finalize(() => {
          setTimeout(() => --this.processingHttpCount === 0 ?
            this.appService.showLoadingBar = false : this.appService.showLoadingBar = true, 500);
        }));

  }
}
