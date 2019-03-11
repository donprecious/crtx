import { PaymentsComponent } from './reviews/payments/payments.component';
import { CstComponent } from './Layouts/cst/cst.component';
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

import { AuthInterceptor } from './services/auth.interceptor';
import { AdminComponent } from './Admin/admin/admin.component';
import { LoginLayoutComponent } from './Layouts/login-layout/login-layout.component';
import { MasterComponent } from './components/master/master.component';
import { MasterLayoutComponent } from './Layouts/master-layout/master-layout.component';
import { SiginComponent } from './account/sigin/sigin.component';
import { ClientComponent } from './layouts/client/client.component';
import { CotComponent } from './layouts/cot/cot.component';
import { SupervisorHomeComponent } from './components/supervisor-home/supervisor-home.component';
import { AssignedComponent } from './Layouts/assigned/assigned.component';
import { OrganisationListComponent } from './organisations/organisation-list/organisation-list.component';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { CstViewComponent } from './components/cst-view/cst-view.component';
import { CotViewComponent } from './components/cot-view/cot-view.component';
import { ClientViewComponent } from './components/client-view/client-view.component';
import { SupervisorComponent } from './Layouts/supervisor/supervisor.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { AssignedViewComponent } from './components/assigned-view/assigned-view.component';
import { AssignedListComponent } from './components/assigned-view/assigned-list/assigned-list.component';
import { ReminderListComponent } from './reviews/reminder-list/reminder-list.component';
import { RescheduleComponent } from './reviews/reschedule/reschedule.component';
import { QueryListComponent } from './reviews/query-list/query-list.component';
import { CreateQueryComponent } from './reviews/create-query/create-query.component';
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
    SiginComponent,
    ClientComponent,
    CotComponent,
    CstComponent,
    SupervisorComponent,
    SupervisorHomeComponent,
    AssignedComponent,
    OrganisationListComponent,
    TeamListComponent,
    ProjectListComponent,
    CstViewComponent,
    CotViewComponent,
    ClientViewComponent,
    CustomerListComponent,
    AssignedViewComponent,
    AssignedListComponent,
    ReminderListComponent,
    RescheduleComponent,
    PaymentsComponent,
    QueryListComponent,
    CreateQueryComponent,

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
export class AppModule {

}
