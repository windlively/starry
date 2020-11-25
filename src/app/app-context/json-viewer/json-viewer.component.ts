import {Component, OnInit} from '@angular/core';
import {AppService} from "../../service/app.service";

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css']
})
export class JsonViewerComponent implements OnInit {

  constructor(public appService: AppService) {
  }

  jsonData: object = {}
  ngOnInit() {
    this.appService.subAppChange.next(this.appService.appMetaInfo[2]);
  }

  previewJson = (value: string) => {
    try {
      this.jsonData = JSON.parse(value)
    }catch (err){
      this.appService.showSnackBar('Error: ' + err['message'])
    }
  }

  set inputJsonString(value: string) {


  }

  get inputJsonString(){
    return JSON.stringify(this.jsonData)
  }

}
