import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AppContextComponent} from './app-context/app-context.component';


const routes: Routes = [
  {
    path: 'index', component: IndexComponent, pathMatch: 'full'
  }, {
    path: 'app-context', component: AppContextComponent, pathMatch: 'full',
    children: []
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
