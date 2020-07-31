import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AppService} from '../service/app.service';

@Component({
  selector: 'app-app-context',
  templateUrl: './app-context.component.html',
  styleUrls: ['./app-context.component.css']
})
export class AppContextComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public appService: AppService) {
  }

}
