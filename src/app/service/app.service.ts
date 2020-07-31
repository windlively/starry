import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  appMetaInfo = [
    {name: 'app1', displayName: '应用01', path: 'app1', icon: 'star', description: '测试应用1'},
    {name: 'app2', displayName: '应用02', path: 'app2', icon: 'star', description: '测试应用1'},
    {name: 'app3', displayName: '应用03', path: 'app3', icon: 'star', description: '测试应用1'},
    {name: 'app4', displayName: '应用04', path: 'app4', icon: 'star', description: '测试应用1'}
  ];

}
