import { Component } from '@angular/core';
import {AppService} from '../service/app.service';

@Component({
  selector: 'app-app-context',
  templateUrl: './app-context.component.html',
  styleUrls: ['./app-context.component.css']
})
export class AppContextComponent {

  constructor(public appService: AppService) {

  }

}
