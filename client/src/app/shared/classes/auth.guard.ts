import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StudentService } from '../services/student.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// @ts-ignore
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private studentService: StudentService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // if we have student id already, navigate to site
    // else, navigate to auth
    if (this.studentService.isHaveId()) {
      return of(true);
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          accessDenied: true,
        },
      });
      return of(false);
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}
