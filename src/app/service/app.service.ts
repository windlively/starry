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
    {
      name: 'json-viewer',
      displayName: 'JSON预览工具',
      path: 'json-viewer',
      icon: 'eye',
      description: '格式化预览JSON字符串'
    },
    {
      name: 'unit-convert',
      displayName: '单位转换',
      path: 'unit-convert',
      icon: 'interaction',
      description: '常用的单位转换'
    },
    {
      name: 'learn-angular',
      displayName: 'learn-angular',
      path: 'learn-angular',
      icon: 'bulb',
      description: ''
    },
    {
      name: 'monaco-editor',
      displayName: 'monaco编辑器',
      path: 'monaco-editor',
      icon: 'edit',
      description: '在线版的VS Code编辑器'
    }
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

export const saveToLocalFile = (data: string | Blob,fileName: string) => {
  const elementA = document.createElement('a');
  elementA.download = fileName
  elementA.style.display = 'none';
  const blob = new Blob([data]);
  elementA.href = URL.createObjectURL(blob);
  document.body.appendChild(elementA);
  elementA.click();
  document.body.removeChild(elementA);
}
