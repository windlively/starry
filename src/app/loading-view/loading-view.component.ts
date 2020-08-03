import { Component, OnInit } from '@angular/core';
import {AppService} from '../service/app.service';

@Component({
  selector: 'app-loading-view',
  templateUrl: './loading-view.component.html',
  styleUrls: ['./loading-view.component.css']
})
export class LoadingViewComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
