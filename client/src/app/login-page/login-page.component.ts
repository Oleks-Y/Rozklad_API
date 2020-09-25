import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { StudentService } from '../shared/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;
  loader = false;
  constructor(
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Z]{2}-[0-9]{2}$'),
      ]),
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    // Todo on mobile error message too low
    //Todo Add loader
    this.form.disable();
    this.aSub = this.studentService.get(this.form.value).subscribe(
      () => this.router.navigate(['/timetable']),
      (error) => {
        MaterialService.toast(error.message);
        console.warn(error);
        this.form.enable();
      }
    );
  }
}
