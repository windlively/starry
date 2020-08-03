import {Component, OnInit} from '@angular/core';
import {NzUploadFile} from 'ng-zorro-antd';
import {AppService} from '../../service/app.service';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
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

  constructor(public appService: AppService) {
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

  generalBasicOCR = () => {

  }
}
