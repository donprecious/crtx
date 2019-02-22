import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ElectronService } from './providers/electron.service';
import { WebviewDirective } from './directives/webview.directive';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { UserModule } from './users/user.module';
import { HttpErrorHandler } from './services/httpErrorHandler.service';
import { RequestInterceptor } from './services/httpInterceptor.service';
import { LoginComponent } from './account/login/login.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AdminComponent } from './Admin/admin/admin.component';
import { LoginLayoutComponent } from './Layouts/login-layout/login-layout.component';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { MasterComponent } from './components/master/master.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    SideBarComponent,
    TopBarComponent,
    FooterComponent,
    AdminComponent,
    LoginLayoutComponent,
    MasterLayoutComponent,
    MasterComponent,
    LoginComponent,




  ],
  imports: [
    BrowserModule,
    // FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,

    UserModule,
  ],

  providers: [ElectronService,
  {provide: 'API_URL', useValue: 'http://localhost:54741/api/'},
  {provide: ErrorHandler, useClass: HttpErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
