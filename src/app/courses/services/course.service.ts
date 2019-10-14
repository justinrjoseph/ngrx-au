import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../models';

@Injectable()
export class CourseService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this.http.get('/api/courses')
      .pipe(map(res => res['payload']));
  }

  getByUrl(url: string): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${url}`);
  }

  save(id: string | number, changes: Partial<Course>) {
    return this.http.put(`/api/course/${id}`, changes);
  }
}
