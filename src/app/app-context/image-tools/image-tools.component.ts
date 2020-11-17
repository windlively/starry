import {Component, OnInit} from '@angular/core';
import {AppService} from "../../service/app.service";
import {UploadChangeParam, UploadFile, UploadXHRArgs} from "ng-zorro-antd";
import {Subject} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

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

  beforeUpload = (uploadFile: UploadFile) => {
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
}
