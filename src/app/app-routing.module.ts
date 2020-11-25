import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AppContextComponent} from './app-context/app-context.component';
import {ImageRecognitionComponent} from './app-context/image-recognition/image-recognition.component';
import {ImageToolsComponent} from "./app-context/image-tools/image-tools.component";
import {JsonViewerComponent} from "./app-context/json-viewer/json-viewer.component";

const routes: Routes = [
  {
    path: 'index', component: IndexComponent, pathMatch: 'full'
  }, {
    path: 'app-context', component: AppContextComponent,
    children: [
      {
        path: 'image-recognition', component: ImageRecognitionComponent
      },
      {
        path: 'image-tools', component: ImageToolsComponent
      },
      {
        path: 'json-viewer', component: JsonViewerComponent
      }
    ]
  }, {
    path: '**', redirectTo: 'index'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
