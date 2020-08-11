import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import { UploadFile, UploadXHRArgs} from 'ng-zorro-antd';
import {Observable, Observer} from 'rxjs';
import {AppService} from '../../../service/app.service';
import {getBase64} from '../image-recognition.component';

@Component({
  selector: 'app-general-basic-ocr',
  templateUrl: './general-basic-ocr.component.html',
  styleUrls: ['./general-basic-ocr.component.css'],
})
export class GeneralBasicOcrComponent implements OnInit {

  constructor(public appService: AppService,
              public httpClient: HttpClient) {
  }

  @Input('ocr-type')
  public ocrType: string;

  // 图片上传方式
  public imageUploadMethod: number = 0;

  public fileList: UploadFile[] = [];

  public previewImage: string | undefined = '';

  public previewVisible = false;

  public imageAlt: string | undefined = '';

  public recognitionResult = '';

  public ngOnInit(): void {
  }

  public handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // tslint:disable-next-line:no-non-null-assertion
      file.preview = await getBase64(file.originFileObj!);
      // console.log(file.preview);
    }
    this.previewImage = file.url || file.preview;
    this.imageAlt = file.filename;
    this.previewVisible = true;
  }

  public beforeUpload = (file: UploadFile, _fileList: UploadFile[]) => {
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
  }

  public generalBasicOCR = (item: UploadXHRArgs) => {
    if (!item.file) {
      this.appService.showSnackBar('empty image file!');
      return;
    }

    getBase64(item.file as any).then((base64Code) => {
      const formData = new FormData();
      formData.append('imageInfo', String(base64Code));
      // return this.httpClient.post('/starry/ocr/general-basic', formData, {reportProgress: true}).subscribe(data => {
      //   console.log(data);
      // });
      const req = new HttpRequest('POST', '/ocr/general-basic', formData, {
        reportProgress: true,
        withCredentials: true,
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
            this.recognitionResult = '';
            for (const line of event.body) {
              this.recognitionResult += line + '\n';
            }
          }
        },
        (err) => {
          item.onError!(err, item.file!);
        },
      );
    });

  }

  mediaStream: MediaStream;

  public openCamera = () => {
    // 选择最接近360x540的分辨率
    var constraints = { video: { width: 360, height: 540 } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        this.mediaStream = mediaStream;

        /* var video = document.querySelector('video'); */
        var video: any = document.getElementById('video');
        video.srcObject = this.mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
        console.log(err.name + ': ' + err.message);
      }); // 最后一定要检查错误。
  }
  avatarUrl: any;
  /**关闭摄像头 */
  closeCamera() {
    this.mediaStream.getTracks().forEach(track => track.stop());
  }

  /**照相 */
  takepicture() {
    var canvas = document.querySelector('canvas');
    var video = document.querySelector('video');
    var context = canvas.getContext('2d');
    canvas.width = 360;
    canvas.height = 540;
    /**
     * 在画布上定位图像，并规定图像的宽度和高度
     * 参数1:图像来源
     * 参数2: 在画布上放置图像的 x 坐标位置。
     * 参数3: 在画布上放置图像的 y 坐标位置。
     * 参数4: 图像的宽
     * 参数5: 图像的高
     */
    context.drawImage(video, 0, 0, 360, 540);
    // data就是拍出照片的base64
    var data = canvas.toDataURL('image/png');
    this.avatarUrl = data;
  }
}

enum ImageUploadType {
  FILE,
  CAMERA
}
