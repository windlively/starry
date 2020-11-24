import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, Subject} from "rxjs";
import {NzIconService} from "ng-zorro-antd";

const giteeIconSvg = `

`

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public showLoadingBar = false;

  public subAppChange = new Subject();

  constructor(public snackBar: MatSnackBar,
              nzIconService: NzIconService) {

  }

  public appMetaInfo: AppInfo[] = [
    {
      name: 'image-recognition',
      displayName: '图片识别',
      path: 'image-recognition',
      icon: 'picture',
      description: '图片类型识别、文字识别(OCR)'
    },
    {
      name: 'image-tools',
      displayName: '图片工具',
      path: 'image-tools',
      icon: 'tool',
      description: 'Base64转码等'
    },
    {name: 'app1', displayName: '应用01', path: '#', icon: 'star', description: '测试应用1'},
    {name: 'app2', displayName: '应用02', path: '#', icon: 'star', description: '测试应用1'},
    // {name: 'app3', displayName: '应用03', path: '#', icon: 'star', description: '测试应用1'},
    // {name: 'app4', displayName: '应用04', path: '#', icon: 'star', description: '测试应用1'}
  ];

  public showSnackBar = (msg: string, duration?: number, action?: string) =>
    this.snackBar.open(msg, action, {
      duration: duration ? duration : 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })


  openUriInNewTab(s: string) {
    window.open(s, '_blank')
  }
}

export class AppInfo {

  public name: string;

  public displayName: string;

  public path: string;

  public icon: string;

  public description: string;

}
