import {Component, OnInit} from '@angular/core';
import {AppService} from '../service/app.service';

@Component({
  selector: 'app-app-context',
  templateUrl: './app-context.component.html',
  styleUrls: ['./app-context.component.css']
})
export class AppContextComponent implements OnInit{

  appTitle: string;

  constructor(public appService: AppService) {

  }

  ngOnInit(): void {

    this.appService.subAppChange.subscribe(appInfo => this.appTitle = appInfo['displayName']);

  }



}
