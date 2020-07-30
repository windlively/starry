import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  appMetaInfo = [
    {name: 'app1', displayName: '应用01', path: 'app1', icon: '', description: ''},
    {name: 'app2', displayName: '应用02', path: 'app2', icon: '', description: ''},
    {name: 'app3', displayName: '应用03', path: 'app3', icon: '', description: ''},
  ];

}
