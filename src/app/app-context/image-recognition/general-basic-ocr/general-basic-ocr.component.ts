import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../service/app.service";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import { UploadFile, UploadXHRArgs} from "ng-zorro-antd";
import {Observable, Observer} from "rxjs";
import {getBase64} from "../image-recognition.component";

@Component({
  selector: 'app-general-basic-ocr',
  templateUrl: './general-basic-ocr.component.html',
  styleUrls: ['./general-basic-ocr.component.css']
})
export class GeneralBasicOcrComponent implements OnInit {

  constructor(public appService: AppService,
              public httpClient: HttpClient) {
  }

  fileList: UploadFile[] = [];

  previewImage: string | undefined = '';

  previewVisible = false;

  imageAlt: string | undefined = '';

  recognitionResult = '';

  ngOnInit(): void {
  }

  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // tslint:disable-next-line:no-non-null-assertion
      file.preview = await getBase64(file.originFileObj!);
      // console.log(file.preview);
    }
    this.previewImage = file.url || file.preview;
    this.imageAlt = file.filename
    this.previewVisible = true;
  }

  beforeUpload = (file: UploadFile, _fileList: UploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isImage = file.type.startsWith('image');
      if (!isImage) {
        this.appService.showSnackBar('You can only upload image file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.appService.showSnackBar('Image must smaller than 5MB!');
        observer.complete();
        return;
      }
      observer.next(isImage && isLt2M);
      observer.complete();
    });
  };

  public generalBasicOCR = (item: UploadXHRArgs) => {
    if (!item.file) {
      this.appService.showSnackBar('empty image file!');
      return;
    }

    getBase64(item.file as any).then(base64Code => {
      const formData = new FormData();
      formData.append('imageInfo', String(base64Code));
      // return this.httpClient.post('/starry/ocr/general-basic', formData, {reportProgress: true}).subscribe(data => {
      //   console.log(data);
      // });
      const req = new HttpRequest('POST', '/ocr/general-basic', formData, {
        reportProgress: true,
        withCredentials: true
      });
      // Always returns a `Subscription` object. nz-upload would automatically unsubscribe it at correct time.
      this.httpClient.request(req).subscribe(
        // tslint:disable-next-line no-any
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            // tslint:disable-next-line:no-non-null-assertion
            if (event.total! > 0) {
              // tslint:disable-next-line:no-any no-non-null-assertion
              (event as any).percent = (event.loaded / event.total!) * 100;
            }
            item.onProgress!(event, item.file!);
          } else if (event instanceof HttpResponse) {
            item.onSuccess!(event.body, item.file!, event);
            this.recognitionResult = ''
            for(let line of event.body){
              this.recognitionResult += line + '\n';
            }
          }
        },
        err => {
          item.onError!(err, item.file!);
        }
      );
    });

  }

}
