import { Injectable } from '@angular/core';
import { root } from 'rxjs/internal-compatibility';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';
import { api_route } from '../utils/routes';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: root,
})
// @ts-ignore
export class StudentService {
  private student_id = '';

  constructor(private http: HttpClient) {
    this.student_id = localStorage.getItem('student-id');
  }

  // return id of the student
  getStudentId(studentCreds: {
    name: string;
    group: string;
  }): Observable<Student> {
    let body: any = {
      Item: { last_name: studentCreds.name, group: studentCreds.group },
    };
    return this.http.post<Student>(api_route + '/student/name', body).pipe(
      tap(
        (student) => {
          // @ts-ignore
          localStorage.setItem('student-id', student._id);
          this.set_student_id(student._id!);
        },
        (e) => {
          e.message = 'Студент не найден';
        }
      )
    );
  }

  set_student_id(id: string) {
    this.student_id = id;
  }

  get_student_id(): string {
    return this.student_id!;
  }

  isHaveId(): boolean {
    return !!this.student_id;
  }

  logout() {
    this.set_student_id('');
    // @ts-ignore
    localStorage.clear();
  }
}
