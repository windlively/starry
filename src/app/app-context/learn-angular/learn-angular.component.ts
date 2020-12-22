import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from "../../service/app.service";

@Component({
  selector: 'app-learn-angular',
  templateUrl: './learn-angular.component.html',
  styleUrls: ['./learn-angular.component.css']
})
export class LearnAngularComponent implements OnInit, OnDestroy {

  constructor(public appService: AppService) { }

  dataBingingDemo: string = "init";

  ngForArray: number[] = []

  mouseActionMessage: string

  forOfArray: string[] = ['a', 'b', 'c', 'd', 'e', 'f']

  ngOnInit() {
    this.appService.subAppChange.next(this.appService.appMetaInfo[4]);
    console.log('init learn-angular component')
  }

  showSnackBar = (msg?: string): any => this.appService.showSnackBar(msg ? msg : 'empty msg')

  ngOnDestroy(): void {
    console.log('destroy learn-angular component')
  }

  changeNgForArray = (count: any): void => {
    let i = 0;
    count = Number(count)
    console.log(count)
    this.ngForArray = new Array(count).fill(0, 0, count)
  }
}
