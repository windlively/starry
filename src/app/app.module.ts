import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {AppRoutingModule} from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { IndexComponent } from './index/index.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AppContextComponent } from './app-context/app-context.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import {AppService} from './service/app.service';
import {MatRippleModule} from '@angular/material/core';
import { ImageRecognitionComponent } from './app-context/image-recognition/image-recognition.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import { LoadingViewComponent } from './loading-view/loading-view.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AppHttpInterceptor} from './interceptor/app-http.interceptor';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { GeneralBasicOcrComponent } from './app-context/image-recognition/general-basic-ocr/general-basic-ocr.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTabsModule} from "@angular/material/tabs";
import {NzGridModule, NzIconModule, NzModalModule, NzTabsModule, NzUploadModule} from "ng-zorro-antd";
import {MatRadioModule} from "@angular/material/radio";

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AppContextComponent,
    ImageRecognitionComponent,
    LoadingViewComponent,
    GeneralBasicOcrComponent,
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
        MatButtonModule,
        LayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatGridListModule,
        MatMenuModule,
        MatRippleModule,
        NzIconModule,
        MatSnackBarModule,
        NzModalModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        NzUploadModule,
        MatExpansionModule,
        NzTabsModule,
        MatTabsModule,
        MatRadioModule,
    ],
  providers: [
    {
      provide: NZ_I18N, useValue: zh_CN
    },
    AppService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
