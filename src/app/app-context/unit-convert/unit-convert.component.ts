import { Component, OnInit } from '@angular/core';
import {AppService} from "../../service/app.service";

@Component({
  selector: 'app-unit-convert',
  templateUrl: './unit-convert.component.html',
  styleUrls: ['./unit-convert.component.css']
})
export class UnitConvertComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.appService.subAppChange.next(this.appService.appMetaInfo[3]);
  }

}
