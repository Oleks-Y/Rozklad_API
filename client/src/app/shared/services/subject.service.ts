import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/Subject';
import { api_route } from '../utils/routes';
import { Injectable } from '@angular/core';
import { root } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: root,
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  get(id: string): Observable<Subject> {
    return this.http.get<Subject>(api_route + `/subject/${id}`);
  }
  update(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(api_route + `/subject/${subject._id}`, {
      Item: subject,
    });
  }
}
