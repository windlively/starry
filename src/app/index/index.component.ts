import {Component, OnInit} from '@angular/core';

import * as paperPlane from '../../assets/js/paper-plane';
import {AppService} from '../service/app.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public appService: AppService) {
  }

  ngOnInit(): void {
    paperPlane.refreshPaperPlane();
  }


}
