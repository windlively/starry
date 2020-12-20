import {Component, OnInit} from '@angular/core';
import {AppService} from "../../service/app.service";

@Component({
  selector: 'app-json-viewer',
  template: `
    <nz-row style="padding: 10px">
      <nz-col>
        <button mat-raised-button (click)="previewJson(jsonInput.value)">预览</button>
      </nz-col>
      <nz-col>
        <!--    <button mat-raised-button (click)="viewer.expanded ? viewer.expanded = false : viewer.expanded = true">{{viewer.expanded ? "折叠" : "展开"}}</button>-->
      </nz-col>
    </nz-row>
    <nz-row [nzGutter]="10" style="padding: 0 10px">
      <nz-col nzSm="24" nzMd="12" nzLg="10" nzXl="8" style="">
        <mat-form-field style="width: 100%;">
          <textarea matInput #jsonInput style="height: 80vh"></textarea>
        </mat-form-field>
      </nz-col>
      <nz-col nzSm="24" nzMd="12" nzLg="14" nzXl="16" style="height: 85vh; overflow-y: scroll">
        <div>
          <ngx-json-viewer #viewer [expanded]="true" [json]="jsonData"></ngx-json-viewer>
        </div>
      </nz-col>
    </nz-row>
  `,
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

  get inputJsonString(): string {
    return JSON.stringify(this.jsonData)
  }

}
