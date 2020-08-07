import {Component, OnInit} from '@angular/core';
import {NzUploadFile, NzUploadXHRArgs} from 'ng-zorro-antd';
import {AppService} from '../../service/app.service';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    console.log(file);
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-image-recognition',
  templateUrl: './image-recognition.component.html',
  styleUrls: ['./image-recognition.component.css']
})
export class ImageRecognitionComponent implements OnInit {

  loading = false;
  avatarUrl?: string;

  constructor(public appService: AppService,
              public httpClient: HttpClient) {
  }

  fileList: NzUploadFile[] = [];

  previewImage: string | undefined = '';

  previewVisible = false;

  ngOnInit(): void {
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      // tslint:disable-next-line:no-non-null-assertion
      file.preview = await getBase64(file.originFileObj!);
      // console.log(file.preview);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  }

  beforeUpload = (file: NzUploadFile) => {
    return true;
  }

  public generalBasicOCR = (item: NzUploadXHRArgs) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(item.file.originFileObj);
    fileReader.onload = () => console.log(fileReader.result);
    fileReader.onerror = (error) => console.error(error);
    return new Observable();
    // if (!item.file){
    //   this.appService.showSnackBar('empty image file!');
    //   return;
    // }
    // console.log(item.file.originFileObj);
    // getBase64(item.file.originFileObj).then( base64Code => {
    //   const formData = new FormData();
    //   formData.append('imageInfo', String(base64Code));
    //   // return this.httpClient.post('/starry/ocr/general-basic', formData, {reportProgress: true}).subscribe(data => {
    //   //   console.log(data);
    //   // });
    //   const req = new HttpRequest('POST', '/starry/ocr/general-basic', formData, {
    //     reportProgress: true
    //   });
    //   // Always returns a `Subscription` object. nz-upload would automatically unsubscribe it at correct time.
    //    this.httpClient.request(req).subscribe(
    //     // tslint:disable-next-line no-any
    //     (event: HttpEvent<any>) => {
    //       if (event.type === HttpEventType.UploadProgress) {
    //         // tslint:disable-next-line:no-non-null-assertion
    //         if (event.total! > 0) {
    //           // tslint:disable-next-line:no-any no-non-null-assertion
    //           (event as any).percent = (event.loaded / event.total!) * 100;
    //         }
    //         item.onProgress!(event, item.file!);
    //       } else if (event instanceof HttpResponse) {
    //         item.onSuccess!(event.body, item.file!, event);
    //       }
    //     },
    //     err => {
    //       item.onError!(err, item.file!);
    //     }
    //   );
    // });

  }
}
