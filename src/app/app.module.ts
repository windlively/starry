import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import { IndexComponent } from './index/index.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NzGridModule} from "ng-zorro-antd";
import {AppRoutingModule} from "./app-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NzGridModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
