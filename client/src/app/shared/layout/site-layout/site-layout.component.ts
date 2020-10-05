import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MaterialService } from '../../classes/material.service';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css'],
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floating') floatingRef: ElementRef;

  constructor(private studentService: StudentService, private router: Router) {}

  ngAfterViewInit() {
    // MaterialService.initializeLoadingButton(this.floatingRef);
  }

  logout() {
    this.studentService.logout();
    this.router.navigate(['/login']);
  }
}
