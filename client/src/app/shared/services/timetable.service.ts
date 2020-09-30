import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/Student';
import { Observable } from 'rxjs';
import { TimeTable } from '../models/TimeTable';
import { api_route } from '../utils/routes';

@Injectable({
  providedIn: 'root',
})
// @ts-ignore
export class TimetableService {
  constructor(private http: HttpClient) {}

  get(id: string): Observable<TimeTable> {
    // student._id != null
    let headers = new HttpHeaders({ student_id: id });
    return this.http.get<TimeTable>(api_route + '/timetable', {
      headers: headers,
    });
  }

  static process(timetable: TimeTable) {
    let item = [];
    Object.keys(timetable).map((key) => {
      item.push(timetable[key]);
    });
    return item;
  }
}
