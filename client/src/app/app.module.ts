import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginLayoutComponent } from './shared/layout/login-layout/login-layout.component';
import { SiteLayoutComponent } from './shared/layout/site-layout/site-layout.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './shared/classes/auth.guard';
import { StudentService } from './shared/services/student.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { TimetablePageComponent } from './timetable-page/timetable-page.component';
import { SubjectPageComponent } from './subject-page/subject-page.component';
import { SubjectService } from './shared/services/subject.service';
import { TimetablePageResponsiveComponent } from './timetable-page-responsive/timetable-page-responsive.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    SiteLayoutComponent,
    LoginPageComponent,
    LoaderComponent,
    TimetablePageComponent,
    SubjectPageComponent,
    TimetablePageResponsiveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    StudentService,
    AuthGuard,
    SubjectService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   multi: true,
    //   useClass: TokenInterceptor,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
