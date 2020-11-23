import {Component, OnInit} from '@angular/core';
import {AppService} from "../../service/app.service";
import {UploadChangeParam, UploadFile, UploadXHRArgs} from "ng-zorro-antd";
import {DomSanitizer} from "@angular/platform-browser";
import {SafeResourceUrl} from "@angular/platform-browser/src/security/dom_sanitization_service";

@Component({
  selector: 'app-image-tools',
  templateUrl: './image-tools.component.html',
  styleUrls: ['./image-tools.component.css']
})
export class ImageToolsComponent implements OnInit {

  constructor(public appService: AppService,
              public sanitizer: DomSanitizer) {
  }

  imageBase64Code = ""

  imageBase64CodeSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageBase64Code);

  ngOnInit() {
    this.appService.subAppChange.next(this.appService.appMetaInfo[1]);

  }

  beforeUploadWithConvertBase64 = (uploadFile: UploadFile) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadFile as any)
    fileReader.onloadend = () => {
      // @ts-ignore
      this.imageBase64Code = fileReader.result
    }
    return false;

  }

  previewImage = () => {
    if(!this.imageBase64Code){
      this.appService.showSnackBar('内容为空')
      return
    }

    this.imageBase64CodeSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageBase64Code)
  }

  handleChange = (event: UploadChangeParam) => {
    console.log(event.file);
  }

  upload = (item: UploadXHRArgs) => {

  }

  beforeUploadWithConvertImageType = (uploadFile: UploadFile) => {
    this.waitingConvertFile = uploadFile
    return false
  };

  convertImageType = (targetType: any) => {
    if(!this.waitingConvertFile){
      this.appService.showSnackBar('未上传图片')
      return
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image()
      img.src = reader.result as string
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
        const src = canvas.toDataURL(targetType)
        this.convertTargetImageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(src)
      }
    }
    reader.readAsDataURL(this.waitingConvertFile as any);
  }

  waitingConvertFile: UploadFile;
  convertTargetImageSrc: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("");
}
