import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../shared/services/subject.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subject } from '../shared/models/Subject';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.css'],
})
export class SubjectPageComponent implements OnInit {
  form: FormGroup;
  subject: Subject;
  loaded = false;

  constructor(
    private subjectService: SubjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // form here
    this.form = new FormGroup({
      lessonsZoom: new FormControl(null, Validators.pattern('^https://.*$')),
      lesson_accessCode: new FormControl(null),
      labsZoom: new FormControl(null, Validators.pattern('^https://.*$')),
      labs_accessCode: new FormControl(null),
    });
    this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          this.loaded = true;
          return this.subjectService.get(params['id']);
        })
      )
      .subscribe((subject) => {
        if (subject) {
          this.subject = subject;
          console.log(subject);
          // to from
          this.form.patchValue({
            lessonsZoom: subject.lessonsZoom[0]?.url,
            lesson_accessCode: subject.lessonsZoom[0]?.accessCode,
            labsZoom: subject.labsZoom[0]?.url,
            labs_accessCode: subject.labsZoom[0]?.accessCode,
          });

          MaterialService.updateTextInputs();
        }
      }),
      (error) => MaterialService.toast(error.message);
  }

  onSubmit() {
    this.form.disable();
    this.subject.lessonsZoom[0].url = this.form.value.lessonsZoom;
    this.subject.lessonsZoom[0].accessCode = this.form.value.lesson_accessCode;
    this.subject.labsZoom[0].url = this.form.value.labsZoom;
    this.subject.labsZoom[0].accessCode = this.form.value.labs_accessCode;
    this.subjectService.update(this.subject).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/timetable']);
      },
      (error) => {
        console.error(error);
        MaterialService.toast('Произошла ошибка =(');
        this.router.navigate([`/subject/`, this.subject._id]);
        this.form.enable();
      }
    );
  }
}
