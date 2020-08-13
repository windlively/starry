import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AppContextComponent} from './app-context/app-context.component';
import {ImageRecognitionComponent} from './app-context/image-recognition/image-recognition.component';


const routes: Routes = [
  {
    path: 'index', component: IndexComponent, pathMatch: 'full'
  }, {
    path: 'app-context', component: AppContextComponent,
    children: [
      {
        path: 'image-recognition', component: ImageRecognitionComponent
      }
    ], redirectTo: 'index'
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
