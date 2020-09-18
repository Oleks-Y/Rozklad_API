import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './shared/layout/login-layout/login-layout.component';
import { SiteLayoutComponent } from './shared/layout/site-layout/site-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TimetablePageComponent } from './timetable-page/timetable-page.component';
import { AuthGuard } from './shared/classes/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: '', redirectTo: '/timetable', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'timetable', component: TimetablePageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
