import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AppContextComponent} from './app-context/app-context.component';
import {ImageRecognitionComponent} from './app-context/image-recognition/image-recognition.component';
import {ImageToolsComponent} from "./app-context/image-tools/image-tools.component";
import {JsonViewerComponent} from "./app-context/json-viewer/json-viewer.component";
import {UnitConvertComponent} from "./app-context/unit-convert/unit-convert.component";
import {LearnAngularComponent} from "./app-context/learn-angular/learn-angular.component";
import {MonacoEditorComponent} from "./app-context/monaco-editor/monaco-editor.component";

const routes: Routes = [
  {
    path: 'index', component: IndexComponent, pathMatch: 'full'
  }, {
    path: 'app-context', component: AppContextComponent,
    children: [
      {
        path: '', redirectTo: '/index', pathMatch: 'full'
      },
      {
        path: 'image-recognition', component: ImageRecognitionComponent, pathMatch: 'full'
      },
      {
        path: 'image-tools', component: ImageToolsComponent, pathMatch: 'full'
      },
      {
        path: 'json-viewer', component: JsonViewerComponent, pathMatch: 'full'
      },
      {
        path: 'unit-convert', component: UnitConvertComponent, pathMatch: 'full'
      },
      {
        path: 'learn-angular', component: LearnAngularComponent, pathMatch: 'full'
      },
      {
        path: 'monaco-editor', component: MonacoEditorComponent, pathMatch: 'full'
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
