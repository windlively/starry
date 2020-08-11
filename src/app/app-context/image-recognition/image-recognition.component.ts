import {Component, OnInit} from '@angular/core';
import {AppService} from "../../service/app.service";

export function getBase64(file: File): Promise<string | ArrayBuffer | null> {
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

  constructor(public appService: AppService) {

  }

  ngOnInit(): void {
    this.appService.subAppChange.next(this.appService.appMetaInfo[0]);
  }


}
